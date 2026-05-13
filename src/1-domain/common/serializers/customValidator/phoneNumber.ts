import { registerDecorator, type ValidationOptions } from 'class-validator'

export function PhoneNumber(
  regex?: RegExp,
  validationOptions?: ValidationOptions
): (object: Record<string, any>, propertyName: string) => void {
  const regexPattern = regex ?? /^\d+$/
  const minLength = 3 // ? E.164 is an international standard that includes the country's calling code (1 to 3 digits)

  let message = ''

  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'phoneNumber',
      target: object.constructor,
      propertyName,
      constraints: [propertyName],
      options: validationOptions,
      validator: {
        validate(value: any) {
          const isEmpty = !value
          if (isEmpty) {
            message = `${propertyName} cannot be an empty string`
            return false
          }

          const isString = typeof value === 'string'
          const isValid = regexPattern.test(String(value))
          console.log(regexPattern, regexPattern.test(String(value)))
          if (!isString || !isValid) {
            message = `${propertyName} must be a string with numeric characters only`
            return false
          }

          if (value?.length < minLength) {
            message = `${propertyName} must be a valid phone number`
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
