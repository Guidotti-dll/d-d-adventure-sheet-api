import { injectable, inject } from 'inversify'
import { AbstractOperator } from '@domain/common/operators/abstractOperator'
import { DeleteUserUseCase } from '@business/useCases/users/deleteUserUseCase'
import { type InputDeleteUser, type OutputDeleteUser } from '@controller/serializers/users/deleteUserSerializer'

@injectable()
export class DeleteUserOperator extends AbstractOperator<InputDeleteUser, OutputDeleteUser> {
  public constructor(@inject(DeleteUserUseCase) private deleteUserUseCase: DeleteUserUseCase) {
    super()
  }

  protected async run(input: InputDeleteUser): Promise<OutputDeleteUser> {
    return this.deleteUserUseCase.exec({
      userId: input.userId,
    })
  }
}
