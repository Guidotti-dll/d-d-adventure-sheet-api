import { injectable, inject } from 'inversify'
import { type IUseCase } from '@domain/common/useCases/iUseCase'
import { left, right } from '@domain/common/utility/either'
import { ILoggerService, ILoggerServiceToken } from '@domain/common/services/iLogger'
import { type IUserRepository, IUserRepositoryToken } from '@business/repositories/users/iUserRepository'
import { type InputDeleteUserDto, type OutputDeleteUserDto } from '@business/dto/users/deleteUserDto'
import { UserDeletionFailed, userNotExist } from '@business/errors/users/user'
import {
  type IDbTransactionRepository,
  IDbTransactionRepositoryToken,
} from '@business/repositories/dbTransaction/iDbTransactionRepository'

@injectable()
export class DeleteUserUseCase implements IUseCase<InputDeleteUserDto, OutputDeleteUserDto> {
  public constructor(
    @inject(IUserRepositoryToken) private userRepository: IUserRepository,
    @inject(IDbTransactionRepositoryToken) private dbTransactionRepository: IDbTransactionRepository,
    @inject(ILoggerServiceToken) private log: ILoggerService
  ) {}

  async exec(input: InputDeleteUserDto): Promise<OutputDeleteUserDto> {
    try {
      const user = await this.userRepository.findUserById(input.userId)

      if (!user) {
        return left(userNotExist)
      }

      const trx = await this.dbTransactionRepository.startTransaction()
      await this.userRepository.delete(input.userId, trx)
      await trx.commit()

      return right(undefined)
    } catch (error) {
      this.log.error(error)
      return left(UserDeletionFailed)
    }
  }
}
