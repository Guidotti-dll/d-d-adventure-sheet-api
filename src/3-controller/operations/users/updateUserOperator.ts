import { injectable, inject } from 'inversify'
import { AbstractOperator } from '@domain/common/operators/abstractOperator'
import { UpdateUserUseCase } from '@business/useCases/users/updateUserUseCase'
import { type InputUpdateUser, type OutputUpdateUser } from '@controller/serializers/users/updateUserSerializer'

@injectable()
export class UpdateUserOperator extends AbstractOperator<InputUpdateUser, OutputUpdateUser> {
  public constructor(@inject(UpdateUserUseCase) private updateUserUseCase: UpdateUserUseCase) {
    super()
  }

  protected async run(input: InputUpdateUser): Promise<OutputUpdateUser> {
    return this.updateUserUseCase.exec({
      userId: input.userId,
      name: input.name,
      email: input.email,
      password: input.password,
      status: input.status,
    })
  }
}
