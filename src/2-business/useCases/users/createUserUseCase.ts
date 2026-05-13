import { injectable, inject } from 'inversify'
import { type IUseCase } from '@domain/common/useCases/iUseCase'
import { left, right } from '@domain/common/utility/either'
import { ILoggerService, ILoggerServiceToken } from '@domain/common/services/iLogger'
import { type IUserRepository, IUserRepositoryToken } from '@business/repositories/users/iUserRepository'
import { UserEntity } from '@domain/entities/users/userEntity'
import { type InputCreateUserDto, type OutputCreateUserDto } from '@business/dto/users/userDto'
import { UserCreationFailed } from '@business/module/errors/users/user'
import {
  type IDbTransactionRepository,
  IDbTransactionRepositoryToken,
} from '@business/repositories/dbTransaction/iDbTransactionRepository'

@injectable()
export class CreateUserUseCase implements IUseCase<InputCreateUserDto, OutputCreateUserDto> {
  public constructor(
    @inject(IUserRepositoryToken) private userRepository: IUserRepository,
    @inject(IDbTransactionRepositoryToken) private dbTransactionRepository: IDbTransactionRepository,
    @inject(ILoggerServiceToken) private log: ILoggerService
  ) {}

  async exec(input: InputCreateUserDto): Promise<OutputCreateUserDto> {
    try {
      const userEntity = UserEntity.create({
        name: input.name,
        type: input.type,
        email: input.email,
        password: input.password,
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
