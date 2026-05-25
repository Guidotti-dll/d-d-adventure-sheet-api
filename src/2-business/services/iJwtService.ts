import { type UserTypes } from '@domain/entities/users/userEntity'
import { type Either } from '@domain/common/utility/either'
import { type IError } from '@domain/common/utility/iError'

export const IJwtServiceToken = Symbol.for('IJwtService')

export interface InputGenerateToken {
  userId: string
  email: string
  type: UserTypes
}

export interface IJwtService {
  generateToken(input: InputGenerateToken): Promise<Either<IError, string>>
}
