import { injectable, inject } from 'inversify'
import { AbstractOperator } from '@domain/common/operators/abstractOperator'
import { RequestPasswordRecoveryUseCase } from '@business/useCases/auth/requestPasswordRecoveryUseCase'
import {
  type InputRequestPasswordRecovery,
  type OutputRequestPasswordRecovery,
} from '@controller/serializers/auth/requestPasswordRecoverySerializer'

@injectable()
export class RequestPasswordRecoveryOperator extends AbstractOperator<
  InputRequestPasswordRecovery,
  OutputRequestPasswordRecovery
> {
  public constructor(
    @inject(RequestPasswordRecoveryUseCase) private requestPasswordRecoveryUseCase: RequestPasswordRecoveryUseCase
  ) {
    super()
  }

  protected async run(input: InputRequestPasswordRecovery): Promise<OutputRequestPasswordRecovery> {
    return this.requestPasswordRecoveryUseCase.exec({
      email: input.email,
    })
  }
}
