import { type UserTypes } from '@domain/entities/users/userEntity'
import { type Either } from '@domain/common/utility/either'
import { type IError } from '@domain/common/utility/iError'

export const IJwtServiceToken = Symbol.for('IJwtService')

export interface JwtPayload {
  userId: string
  email: string
  type: UserTypes
}

export interface IJwtService {
  generateToken(input: JwtPayload): Promise<Either<IError, string>>
  verifyToken(token: string): Promise<Either<IError, JwtPayload>>
}
