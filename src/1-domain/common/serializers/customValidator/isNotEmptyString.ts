import { registerDecorator, type ValidationOptions } from 'class-validator'

export function IsNotEmptyString(
  validationOptions?: ValidationOptions
): (object: object, propertyName: string) => void {
  let message = ''

  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isNotEmptyString',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (value === null || value === undefined) {
            message = `${propertyName} cannot be null or undefined`
            return false
          }

          if (typeof value !== 'string') {
            message = `${propertyName} must be a string`
            return false
          }

          if (value.trim() === '') {
            message = `${propertyName} cannot be a empty string`
            return false
          }

          return true
        },
        defaultMessage() {
          return message
        },
      },
    })
  }
}
