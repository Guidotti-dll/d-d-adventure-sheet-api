import { registerDecorator, type ValidationOptions } from 'class-validator'

export function AccountCurrency(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'currency',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(currency: any, validationArguments: any) {
          const currencies: string[] = validationArguments?.object?.currencies ?? []
          if (Array.isArray(currencies) && currencies.length > 0 && !currencies.includes(currency)) {
            return false
          }

          return true
        },
        defaultMessage(validationArguments: any) {
          const currencies: string[] = validationArguments?.object?.currencies ?? []
          return `It is not possible to use the currency provided. Allowed currencies are: ${currencies.join(', ')}`
        },
      },
    })
  }
}
