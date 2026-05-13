import express, { type Express } from 'express'
import { registerRoutes } from '@framework/http/routes/index'

export function createExpressApp(): Express {
  const app = express()

  app.disable('x-powered-by')
  app.use(express.json())

  registerRoutes(app)

  app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction): void => {
    console.dir(err, { depth: Infinity })
    res.status(500).json({ message: 'Internal Server Error' })
  })

  return app
}
