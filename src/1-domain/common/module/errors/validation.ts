export const validationError = (details: any): any => {
  return {
    code: 'val-001',
    message: 'Validation Error',
    shortMessage: 'validationError',
    details,
  }
}
