import jwt, { type SignOptions } from 'jsonwebtoken'
import { injectable } from 'inversify'
import { UserTypes } from '@domain/entities/users/userEntity'
import { type JwtPayload, type IJwtService } from '@business/services/iJwtService'
import {
  JwtExpiredToken,
  JwtGenerationFailed,
  JwtInvalidToken,
  JwtSecretNotConfigured,
} from '@business/errors/services/jwtService'
import { Left, Right, type Either } from '@domain/common/utility/either'
import { type IError } from '@domain/common/utility/iError'

@injectable()
export class JwtService implements IJwtService {
  async generateToken(input: JwtPayload): Promise<Either<IError, string>> {
    try {
      const secret = process.env.JWT_SECRET

      if (!secret) {
        return new Left(JwtSecretNotConfigured)
      }

      const signOptions: SignOptions = {
        expiresIn: (process.env.JWT_EXPIRES_IN ?? '7d') as SignOptions['expiresIn'],
      }

      const token = jwt.sign(
        {
          sub: input.userId,
          email: input.email,
          type: input.type,
        },
        secret,
        signOptions
      )

      return new Right(token)
    } catch (e) {
      console.log({ jwtGenerationError: (e as Error).message ?? e })
      return new Left(JwtGenerationFailed)
    }
  }

  async verifyToken(token: string): Promise<Either<IError, JwtPayload>> {
    try {
      const secret = process.env.JWT_SECRET

      if (!secret) {
        return new Left(JwtSecretNotConfigured)
      }

      const decoded = jwt.verify(token, secret)

      if (typeof decoded === 'string') {
        return new Left(JwtInvalidToken)
      }

      const { sub, email, type } = decoded

      if (typeof sub !== 'string' || typeof email !== 'string' || !Object.values(UserTypes).includes(type)) {
        return new Left(JwtInvalidToken)
      }

      return new Right({
        userId: sub,
        email,
        type: type as UserTypes,
      })
    } catch (e) {
      if (e instanceof jwt.TokenExpiredError) {
        return new Left(JwtExpiredToken)
      }
      console.log({ jwtVerificationError: (e as Error).message ?? e })
      return new Left(JwtInvalidToken)
    }
  }
}
