/**
 * Function to convert a value in cents to a floating point number representing float value.
 * This is useful for converting monetary values stored in cents back to currency with two decimal places.
 *
 * @param {number} value - The value in cents to convert to float value.
 * @returns {number} - The value in float value as a floating point number with two decimal places.
 *
 * @example
 * const integerValue = 15055;
 * const valueInFloat = getValueInFloat(integerValue); This will returns 150.55
 */
export const getValueInFloat = (value: number): number => {
  if (!value) return 0
  const number = (value / 100).toString()

  const floatNumber = number.match(/^(\d+)\.(\d{2})/)
  const formattedNumber = floatNumber ? floatNumber[0] : parseFloat(number).toFixed(2)

  return parseFloat(formattedNumber)
}

/**
 * Function to convert a float value to integer.
 * This is useful for converting monetary values to floating point
 *
 * @param {number} value - The value in float to be converted to cents.
 * @returns {number} – The value in cents.
 *
 * @example
 * const valueInFloat = 150.55;
 * const integerValue = getValueInInteger(valorInFloat); This will returns 15055
 */
export const getValueInInteger = (value: number): number => {
  const result = (value * 100).toFixed(2) // toFixed(2) helps avoid rounding inaccuracies.

  return parseFloat(result)
}
