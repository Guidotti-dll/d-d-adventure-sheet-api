import { type IEncryptService } from '@business/services/iEncryptService'
import { Right } from '@domain/common/utility/either'

export const encryptServiceMock: jest.Mocked<IEncryptService> = {
  generateUuid: jest.fn().mockReturnValue('generated-uuid'),
  encrypt: jest.fn().mockResolvedValue(new Right('hashed-password')),
  compare: jest.fn().mockResolvedValue(new Right(true)),
}
