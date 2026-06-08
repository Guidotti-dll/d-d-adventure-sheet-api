import { injectable, inject } from 'inversify'
import { type IUseCase } from '@domain/common/useCases/iUseCase'
import { left, right } from '@domain/common/utility/either'
import { ILoggerService, ILoggerServiceToken } from '@domain/common/services/iLogger'
import { PasswordRecoveryTokenEntity } from '@domain/entities/auth/passwordRecoveryTokenEntity'
import { type IUserRepository, IUserRepositoryToken } from '@business/repositories/users/iUserRepository'
import { type InputResetPasswordDto, type OutputResetPasswordDto } from '@business/dto/auth/resetPasswordDto'
import {
  invalidRecoveryToken,
  passwordResetFailed,
  recoveryTokenAlreadyUsed,
  recoveryTokenExpired,
} from '@business/errors/auth/passwordRecovery'
import { userNotExist } from '@business/errors/users/user'
import {
  type IPasswordRecoveryTokenRepository,
  IPasswordRecoveryTokenRepositoryToken,
} from '@business/repositories/auth/iPasswordRecoveryTokenRepository'
import {
  type IDbTransactionRepository,
  IDbTransactionRepositoryToken,
} from '@business/repositories/dbTransaction/iDbTransactionRepository'
import { IEncryptService, IEncryptServiceToken } from '@business/services/iEncryptService'

@injectable()
export class ResetPasswordUseCase implements IUseCase<InputResetPasswordDto, OutputResetPasswordDto> {
  public constructor(
    @inject(IPasswordRecoveryTokenRepositoryToken)
    private passwordRecoveryTokenRepository: IPasswordRecoveryTokenRepository,
    @inject(IUserRepositoryToken) private userRepository: IUserRepository,
    @inject(IDbTransactionRepositoryToken) private dbTransactionRepository: IDbTransactionRepository,
    @inject(IEncryptServiceToken) private encrypt: IEncryptService,
    @inject(ILoggerServiceToken) private log: ILoggerService
  ) {}

  async exec(input: InputResetPasswordDto): Promise<OutputResetPasswordDto> {
    try {
      const recoveryToken = await this.passwordRecoveryTokenRepository.findByToken(input.token)

      if (!recoveryToken) {
        return left(invalidRecoveryToken)
      }

      const tokenEntity = PasswordRecoveryTokenEntity.fromExisting(recoveryToken)

      if (recoveryToken.used) {
        return left(recoveryTokenAlreadyUsed)
      }

      if (tokenEntity.isExpired()) {
        return left(recoveryTokenExpired)
      }

      const user = await this.userRepository.findUserById(recoveryToken.userId)

      if (!user) {
        return left(userNotExist)
      }

      const encryptPassword = await this.encrypt.encrypt(input.password)

      if (encryptPassword.isLeft()) {
        return left(encryptPassword.value)
      }

      const trx = await this.dbTransactionRepository.startTransaction()

      await this.userRepository.update(
        {
          ...user,
          password: encryptPassword.value,
          updatedAt: new Date(),
        },
        trx
      )

      await this.passwordRecoveryTokenRepository.markAsUsed(recoveryToken.id, trx)
      await trx.commit()

      return right(true)
    } catch (error) {
      this.log.error(error)
      return left(passwordResetFailed)
    }
  }
}
