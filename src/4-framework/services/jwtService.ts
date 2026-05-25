import jwt, { type SignOptions } from 'jsonwebtoken'
import { injectable } from 'inversify'
import { type InputGenerateToken, type IJwtService } from '@business/services/iJwtService'
import { JwtGenerationFailed, JwtSecretNotConfigured } from '@business/errors/services/jwtService'
import { Left, Right, type Either } from '@domain/common/utility/either'
import { type IError } from '@domain/common/utility/iError'

@injectable()
export class JwtService implements IJwtService {
  async generateToken(input: InputGenerateToken): Promise<Either<IError, string>> {
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
}
