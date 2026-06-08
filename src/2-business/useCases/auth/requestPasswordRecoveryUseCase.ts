import { randomBytes } from 'crypto'
import { injectable, inject } from 'inversify'
import { type IUseCase } from '@domain/common/useCases/iUseCase'
import { left, right } from '@domain/common/utility/either'
import { ILoggerService, ILoggerServiceToken } from '@domain/common/services/iLogger'
import { UserStatus } from '@domain/entities/users/userEntity'
import { PasswordRecoveryTokenEntity } from '@domain/entities/auth/passwordRecoveryTokenEntity'
import { type IUserRepository, IUserRepositoryToken } from '@business/repositories/users/iUserRepository'
import {
  type InputRequestPasswordRecoveryDto,
  type OutputRequestPasswordRecoveryDto,
} from '@business/dto/auth/requestPasswordRecoveryDto'
import { passwordRecoveryRequestFailed } from '@business/errors/auth/passwordRecovery'
import {
  type IPasswordRecoveryTokenRepository,
  IPasswordRecoveryTokenRepositoryToken,
} from '@business/repositories/auth/iPasswordRecoveryTokenRepository'
import {
  type IDbTransactionRepository,
  IDbTransactionRepositoryToken,
} from '@business/repositories/dbTransaction/iDbTransactionRepository'
import { type IEmailService, IEmailServiceToken } from '@business/services/iEmailService'
import { IEncryptService, IEncryptServiceToken } from '@business/services/iEncryptService'

@injectable()
export class RequestPasswordRecoveryUseCase
  implements IUseCase<InputRequestPasswordRecoveryDto, OutputRequestPasswordRecoveryDto>
{
  public constructor(
    @inject(IUserRepositoryToken) private userRepository: IUserRepository,
    @inject(IPasswordRecoveryTokenRepositoryToken)
    private passwordRecoveryTokenRepository: IPasswordRecoveryTokenRepository,
    @inject(IDbTransactionRepositoryToken) private dbTransactionRepository: IDbTransactionRepository,
    @inject(IEmailServiceToken) private emailService: IEmailService,
    @inject(IEncryptServiceToken) private encrypt: IEncryptService,
    @inject(ILoggerServiceToken) private log: ILoggerService
  ) {}

  async exec(input: InputRequestPasswordRecoveryDto): Promise<OutputRequestPasswordRecoveryDto> {
    try {
      const user = await this.userRepository.findUserByEmail(input.email)

      if (!user || user.status !== UserStatus.ACTIVE) {
        return right(true)
      }

      const expiresInHours = Number(process.env.PASSWORD_RECOVERY_TOKEN_EXPIRES_IN_HOURS ?? 1)
      const expiresAt = new Date(Date.now() + expiresInHours * 60 * 60 * 1000)
      const token = randomBytes(32).toString('hex')

      const tokenEntity = PasswordRecoveryTokenEntity.create({
        id: this.encrypt.generateUuid(),
        userId: user.id,
        token,
        expiresAt,
      })

      if (tokenEntity.isLeft()) {
        return left(tokenEntity.value)
      }

      const trx = await this.dbTransactionRepository.startTransaction()
      await this.passwordRecoveryTokenRepository.invalidateUnusedByUserId(user.id, trx)
      await this.passwordRecoveryTokenRepository.create(tokenEntity.value.export(), trx)
      await trx.commit()

      const emailResult = await this.emailService.sendPasswordRecoveryEmail({
        email: user.email,
        token,
      })

      if (emailResult.isLeft()) {
        this.log.error(emailResult.value)
      }

      return right(true)
    } catch (error) {
      this.log.error(error)
      return left(passwordRecoveryRequestFailed)
    }
  }
}
