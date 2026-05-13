import { registerDecorator, type ValidationOptions, type ValidationArguments, validateSync } from 'class-validator'
import { plainToClass } from 'class-transformer'

export function ValidateObjectInArray(requiredFields: string[], validationOptions?: ValidationOptions) {
  return function (object: Record<string, unknown>, propertyName: string) {
    registerDecorator({
      name: 'ValidateObjectInArray',
      target: object.constructor,
      propertyName,
      constraints: requiredFields,
      options: validationOptions,
      validator: {
        validate(values: any[], args: ValidationArguments) {
          if (!values || values.length === 0) {
            return false
          }
          const require = args.constraints
          const result = values.map((item: Record<string, unknown>) => require.every(req => item[req] !== undefined))
          return !result.includes(false)
        },
        defaultMessage() {
          return 'Incorrect or missing mandatory fields'
        },
      },
    })
  }
}
interface IValidateCustomNestedOptions extends ValidationOptions {
  propName?: string
}
export function ValidateCustomNested(schema: new () => any, validationOptions?: IValidateCustomNestedOptions) {
  return function (object: Record<string, unknown>, propertyName: string) {
    registerDecorator({
      name: validationOptions?.propName ?? 'ValidateCustomNested',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: unknown) {
          if (!value || typeof value !== 'object') {
            return false
          }
          if (Array.isArray(value)) {
            for (let i = 0; i < value.length; i++) {
              if (validateSync(plainToClass(schema, value[i])).length) {
                return false
              }
            }
            return true
          } else {
            return !validateSync(plainToClass(schema, value)).length
          }
        },
        defaultMessage(args?: ValidationArguments) {
          const value = args?.value
          if (!value || typeof value !== 'object') {
            return 'missing mandatory fields'
          }
          if (Array.isArray(value)) {
            let message = ''
            for (const item of value) {
              const errors = validateSync(plainToClass(schema, item))
              const constraints: string[] = errors.flatMap(e => Object.values(e.constraints ?? {}))
              message += constraints.join(', ')
            }
            return message
          } else {
            const fields = validateSync(plainToClass(schema, value)).map(e => ({
              property: e.property,
              constraints: e.constraints,
            }))

            return JSON.stringify(fields)
          }
        },
      },
    })
  }
}
