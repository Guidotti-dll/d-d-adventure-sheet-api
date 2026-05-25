import { injectable, inject } from 'inversify'
import { type IUseCase } from '@domain/common/useCases/iUseCase'
import { left, right } from '@domain/common/utility/either'
import { ILoggerService, ILoggerServiceToken } from '@domain/common/services/iLogger'
import { type IUserRepository, IUserRepositoryToken } from '@business/repositories/users/iUserRepository'
import { UserEntity } from '@domain/entities/users/userEntity'
import { type InputCreateUserDto, type OutputCreateUserDto } from '@business/dto/users/createUserDto'
import { UserCreationFailed } from '@business/errors/users/user'
import {
  type IDbTransactionRepository,
  IDbTransactionRepositoryToken,
} from '@business/repositories/dbTransaction/iDbTransactionRepository'
import { IEncryptService, IEncryptServiceToken } from '@business/services/iEncryptService'

@injectable()
export class CreateUserUseCase implements IUseCase<InputCreateUserDto, OutputCreateUserDto> {
  public constructor(
    @inject(IUserRepositoryToken) private userRepository: IUserRepository,
    @inject(IDbTransactionRepositoryToken) private dbTransactionRepository: IDbTransactionRepository,
    @inject(ILoggerServiceToken) private log: ILoggerService,
    @inject(IEncryptServiceToken) private encrypt: IEncryptService
  ) {}

  async exec(input: InputCreateUserDto): Promise<OutputCreateUserDto> {
    try {
      const encryptPassword = await this.encrypt.encrypt(input.password)

      if (encryptPassword.isLeft()) {
        return left(encryptPassword.value)
      }

      const uuid = this.encrypt.generateUuid()

      const userEntity = UserEntity.create({
        id: uuid,
        name: input.name,
        email: input.email,
        password: encryptPassword.value,
      })

      this.log.info({ userEntity: userEntity.value })
      if (userEntity.isLeft()) {
        return left(userEntity.value)
      }

      const trx = await this.dbTransactionRepository.startTransaction()
      const user = await this.userRepository.create(userEntity.value.export(), trx)
      await trx.commit()

      return right(user)
    } catch (error) {
      this.log.error(error)
      return left(UserCreationFailed)
    }
  }
}
