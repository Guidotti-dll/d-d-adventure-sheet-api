import express, { type Express } from 'express'
import { registerRoutes } from '@framework/http/routes/index'
import swaggerUi from 'swagger-ui-express'
import listEndpoints from 'express-list-endpoints'

// import { swaggerSpec } from './docs/swagger'
import { openApiConfig } from './docs/openApi'

export function createExpressApp(): Express {
  const app = express()

  app.disable('x-powered-by')
  app.use(express.json())

  app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction): void => {
    console.dir(err, { depth: Infinity })
    res.status(500).json({ message: 'Internal Server Error' })
  })

  app.use(express.json())

  // app.use('/docs', ...swaggerUi.serve, swaggerUi.setup(swaggerSpec))

  registerRoutes(app)

  app.use(
    '/docs',
    swaggerUi.serve,

    swaggerUi.setup(openApiConfig, {
      swaggerOptions: {
        persistAuthorization: true,
      },
    })
  )

  app.get('/routes', (_, res) => {
    res.json(listEndpoints(app))
  })

  return app
}
