import { validationError } from '@domain/common/module/errors/validation'
import { type Validatable } from '../serializers/abstractValidatable'
import { parseJSONRecursively } from '@domain/common/utility/utils/parseJSON'
import { ValidationError } from 'class-validator'
import { injectable } from 'inversify'
import 'reflect-metadata'

@injectable()
export abstract class AbstractOperator<I, O> {
  protected abstract run(input?: Validatable<I>): Promise<O>

  public async exec(input?: Validatable<I>): Promise<O> {
    try {
      if (input) {
        input.validate()
      }
      return this.run(input)
    } catch (err) {
      if (err instanceof Array && err.length && err[0] instanceof ValidationError) {
        const data = err.map(i => {
          return parseJSONRecursively({
            property: i.property,
            constraints: i.constraints,
          })
        })
        throw validationError(data)
      }
      throw err
    }
  }
}
