import { type Express } from 'express'
import { usersRouter } from '@framework/http/routes/users.routes'

export function registerRoutes(app: Express): void {
  app.use('/users', usersRouter)
}
