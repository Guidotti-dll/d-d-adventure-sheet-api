import { injectable, inject } from 'inversify'
import { type IUseCase } from '@domain/common/useCases/iUseCase'
import { left, right } from '@domain/common/utility/either'
import { ILoggerService, ILoggerServiceToken } from '@domain/common/services/iLogger'
import { type IUserRepository, IUserRepositoryToken } from '@business/repositories/users/iUserRepository'
import { type InputListUsersDto, type OutputListUsersDto } from '@business/dto/users/listUsersDto'
import { UserListingFailed } from '@business/errors/users/user'

const DEFAULT_PAGE = 1
const DEFAULT_LIMIT = 10

@injectable()
export class ListUsersUseCase implements IUseCase<InputListUsersDto, OutputListUsersDto> {
  public constructor(
    @inject(IUserRepositoryToken) private userRepository: IUserRepository,
    @inject(ILoggerServiceToken) private log: ILoggerService
  ) {}

  async exec(input: InputListUsersDto): Promise<OutputListUsersDto> {
    try {
      const users = await this.userRepository.listBy({
        name: input.name,
        email: input.email,
        page: input.page ?? DEFAULT_PAGE,
        limit: input.limit ?? DEFAULT_LIMIT,
      })

      return right(users)
    } catch (error) {
      this.log.error(error)
      return left(UserListingFailed)
    }
  }
}
