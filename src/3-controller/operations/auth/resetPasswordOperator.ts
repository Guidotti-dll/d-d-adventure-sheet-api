import { injectable, inject } from 'inversify'
import { AbstractOperator } from '@domain/common/operators/abstractOperator'
import { ResetPasswordUseCase } from '@business/useCases/auth/resetPasswordUseCase'
import { type InputResetPassword, type OutputResetPassword } from '@controller/serializers/auth/resetPasswordSerializer'

@injectable()
export class ResetPasswordOperator extends AbstractOperator<InputResetPassword, OutputResetPassword> {
  public constructor(@inject(ResetPasswordUseCase) private resetPasswordUseCase: ResetPasswordUseCase) {
    super()
  }

  protected async run(input: InputResetPassword): Promise<OutputResetPassword> {
    return this.resetPasswordUseCase.exec({
      token: input.token,
      password: input.password,
    })
  }
}
