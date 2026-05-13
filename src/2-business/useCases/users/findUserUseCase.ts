import { injectable, inject } from 'inversify'
import { type IUseCase } from '@domain/common/useCases/iUseCase'
import { left, right } from '@domain/common/utility/either'
import { type IUserRepository, IUserRepositoryToken } from '@business/repositories/users/iUserRepository'
import { type InputFindUserDto, type OutputFindUserDto } from '@business/dto/users/userDto'
import { userNotExist } from '@business/module/errors/users/user'

@injectable()
export class FindUserUseCase implements IUseCase<InputFindUserDto, OutputFindUserDto> {
  public constructor(@inject(IUserRepositoryToken) private userRepository: IUserRepository) {}

  async exec(input: InputFindUserDto): Promise<OutputFindUserDto> {
    const user = await this.userRepository.findUserById(input.userId)

    if (!user) {
      return left(userNotExist)
    }

    return right(user)
  }
}
