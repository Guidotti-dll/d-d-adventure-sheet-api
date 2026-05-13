import { injectable, inject } from 'inversify'
import { AbstractOperator } from '@domain/common/operators/abstractOperator'

import { FindUserUseCase } from '@business/useCases/users/findUserUseCase'
import { type InputFindUser, type OutputFindUser } from '@controller/serializers/users/findUserSerializer'

@injectable()
export class FindUserOperator extends AbstractOperator<InputFindUser, OutputFindUser> {
  public constructor(@inject(FindUserUseCase) private findUserUseCase: FindUserUseCase) {
    super()
  }

  protected async run(input: InputFindUser): Promise<OutputFindUser> {
    return this.findUserUseCase.exec({
      userId: input.userId,
    })
  }
}
