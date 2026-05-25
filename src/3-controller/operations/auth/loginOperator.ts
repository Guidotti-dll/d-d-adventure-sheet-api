import { injectable, inject } from 'inversify'
import { AbstractOperator } from '@domain/common/operators/abstractOperator'
import { LoginUseCase } from '@business/useCases/auth/loginUseCase'
import { type InputLogin, type OutputLogin } from '@controller/serializers/auth/loginSerializer'

@injectable()
export class LoginOperator extends AbstractOperator<InputLogin, OutputLogin> {
  public constructor(@inject(LoginUseCase) private loginUseCase: LoginUseCase) {
    super()
  }

  protected async run(input: InputLogin): Promise<OutputLogin> {
    return this.loginUseCase.exec({
      email: input.email,
      password: input.password,
    })
  }
}
