import { type IJwtService } from '@business/services/iJwtService'
import { Right } from '@domain/common/utility/either'

export const jwtServiceMock: jest.Mocked<IJwtService> = {
  generateToken: jest.fn().mockResolvedValue(new Right('jwt-token')),
  verifyToken: jest.fn(),
}
