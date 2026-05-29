import { injectable, inject } from 'inversify'
import { type IUseCase } from '@domain/common/useCases/iUseCase'
import { left, right } from '@domain/common/utility/either'
import { ILoggerService, ILoggerServiceToken } from '@domain/common/services/iLogger'
import { type IUserRepository, IUserRepositoryToken } from '@business/repositories/users/iUserRepository'
import { type InputUpdateUserDto, type OutputUpdateUserDto } from '@business/dto/users/updateUserDto'
import { emailAlreadyInUse, noFieldsToUpdate, UserUpdateFailed, userNotExist } from '@business/errors/users/user'
import {
  type IDbTransactionRepository,
  IDbTransactionRepositoryToken,
} from '@business/repositories/dbTransaction/iDbTransactionRepository'
import { IEncryptService, IEncryptServiceToken } from '@business/services/iEncryptService'

@injectable()
export class UpdateUserUseCase implements IUseCase<InputUpdateUserDto, OutputUpdateUserDto> {
  public constructor(
    @inject(IUserRepositoryToken) private userRepository: IUserRepository,
    @inject(IDbTransactionRepositoryToken) private dbTransactionRepository: IDbTransactionRepository,
    @inject(ILoggerServiceToken) private log: ILoggerService,
    @inject(IEncryptServiceToken) private encrypt: IEncryptService
  ) {}

  async exec(input: InputUpdateUserDto): Promise<OutputUpdateUserDto> {
    try {
      const hasUpdates = input.name ?? input.email ?? input.password ?? input.status

      if (!hasUpdates) {
        return left(noFieldsToUpdate)
      }

      const existingUser = await this.userRepository.findUserById(input.userId)

      if (!existingUser) {
        return left(userNotExist)
      }

      if (input.email && input.email !== existingUser.email) {
        const userWithEmail = await this.userRepository.findUserByEmail(input.email)

        if (userWithEmail && userWithEmail.id !== input.userId) {
          return left(emailAlreadyInUse)
        }
      }

      let password = existingUser.password

      if (input.password) {
        const encryptPassword = await this.encrypt.encrypt(input.password)

        if (encryptPassword.isLeft()) {
          return left(encryptPassword.value)
        }

        password = encryptPassword.value
      }

      const updatedUser = {
        ...existingUser,
        name: input.name ?? existingUser.name,
        email: input.email ?? existingUser.email,
        password,
        status: input.status ?? existingUser.status,
        updatedAt: new Date(),
      }

      const trx = await this.dbTransactionRepository.startTransaction()
      const user = await this.userRepository.update(updatedUser, trx)
      await trx.commit()

      return right(user)
    } catch (error) {
      this.log.error(error)
      return left(UserUpdateFailed)
    }
  }
}
