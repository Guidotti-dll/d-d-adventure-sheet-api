import { type JwtPayload } from '@business/services/iJwtService'

export {}

declare global {
  namespace Express {
    interface Request {
      auth?: JwtPayload
    }
  }
}
