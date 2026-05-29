import { injectable, inject } from 'inversify'
import { AbstractOperator } from '@domain/common/operators/abstractOperator'
import { ListUsersUseCase } from '@business/useCases/users/listUsersUseCase'
import { type InputListUsers, type OutputListUsers } from '@controller/serializers/users/listUsersSerializer'

@injectable()
export class ListUsersOperator extends AbstractOperator<InputListUsers, OutputListUsers> {
  public constructor(@inject(ListUsersUseCase) private listUsersUseCase: ListUsersUseCase) {
    super()
  }

  protected async run(input: InputListUsers): Promise<OutputListUsers> {
    return this.listUsersUseCase.exec({
      name: input.name,
      email: input.email,
      page: input.page,
      limit: input.limit,
    })
  }
}
