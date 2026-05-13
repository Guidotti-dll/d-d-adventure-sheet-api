import { injectable, inject } from 'inversify'
import { AbstractOperator } from '@domain/common/operators/abstractOperator'
import { CreateUserUseCase } from '@business/useCases/users/createUserUseCase'
import { type InputCreateUser, type OutputCreateUser } from '@controller/serializers/users/createUserSerializer'

@injectable()
export class CreateUserOperator extends AbstractOperator<InputCreateUser, OutputCreateUser> {
  public constructor(@inject(CreateUserUseCase) private createUserUseCase: CreateUserUseCase) {
    super()
  }

  protected async run(input: InputCreateUser): Promise<OutputCreateUser> {
    return this.createUserUseCase.exec({
      name: input.name,
      email: input.email,
      password: input.password,
      type: input.type,
    })
  }
}
