import { injectable, inject } from 'inversify'
import { type IUseCase } from '@domain/common/useCases/iUseCase'
import { left, right } from '@domain/common/utility/either'
import { ILoggerService, ILoggerServiceToken } from '@domain/common/services/iLogger'
import { UserStatus } from '@domain/entities/users/userEntity'
import { type IUserRepository, IUserRepositoryToken } from '@business/repositories/users/iUserRepository'
import { type InputLoginDto, type OutputLoginDto } from '@business/dto/auth/loginDto'
import { invalidCredentials, loginFailed, userInactive } from '@business/errors/auth/auth'
import { IEncryptService, IEncryptServiceToken } from '@business/services/iEncryptService'
import { type IJwtService, IJwtServiceToken } from '@business/services/iJwtService'

@injectable()
export class LoginUseCase implements IUseCase<InputLoginDto, OutputLoginDto> {
  public constructor(
    @inject(IUserRepositoryToken) private userRepository: IUserRepository,
    @inject(IEncryptServiceToken) private encrypt: IEncryptService,
    @inject(IJwtServiceToken) private jwtService: IJwtService,
    @inject(ILoggerServiceToken) private log: ILoggerService
  ) {}

  async exec(input: InputLoginDto): Promise<OutputLoginDto> {
    try {
      const user = await this.userRepository.findUserByEmail(input.email)

      if (!user) {
        return left(invalidCredentials)
      }

      if (user.status !== UserStatus.ACTIVE) {
        return left(userInactive)
      }

      const passwordMatch = await this.encrypt.compare({
        plain: input.password,
        encrypted: user.password,
      })

      if (passwordMatch.isLeft()) {
        return left(passwordMatch.value)
      }

      if (!passwordMatch.value) {
        return left(invalidCredentials)
      }

      const token = await this.jwtService.generateToken({
        userId: user.id,
        email: user.email,
        type: user.type,
      })

      if (token.isLeft()) {
        return left(token.value)
      }

      const { password: _password, ...userWithoutPassword } = user

      return right({ user: userWithoutPassword, token: token.value })
    } catch (error) {
      this.log.error(error)
      return left(loginFailed)
    }
  }
}
