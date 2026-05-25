import { type Express } from 'express'
import { authRouter } from '@framework/http/routes/auth.routes'
import { usersRouter } from '@framework/http/routes/users.routes'

export function registerRoutes(app: Express): void {
  app.use('/auth', authRouter)
  app.use('/users', usersRouter)
}
