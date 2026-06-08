import { type IError } from '@domain/common/utility/iError'

export const EmailSendFailed: IError = {
  code: 'EML-001',
  message: 'Failed to send email',
  shortMessage: 'emailSendFailed',
}
