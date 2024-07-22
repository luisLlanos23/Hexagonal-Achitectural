import Express, {
  Express as IExpress,
  NextFunction,
  Request as IRequest,
  Response as IResponse
} from 'express'
import Http from 'http'
import Cors from 'cors'
import Multer from 'multer'
import SwaggerUi from 'swagger-ui-express'
import SwaggerApi from 'src/infrastructure/rest/openapi'
import { Environments } from 'src/constants/Environment'
import { APIRoutes } from 'src/infrastructure/rest/routes'
import { Endpoint } from 'src/infrastructure/rest/types'
import { configureDiskStorage } from 'src/infrastructure/rest/lib/configureDiskStorage'
import { validateEndpoints } from 'src/infrastructure/rest/middlewares/EndpointValidator'

export async function setUpServer(): Promise<void> {
  const port = Environments.restPort || 4000
  const server: IExpress = Express()

  await setMiddlewares(server)
  setEndpoints(server)
  Http.createServer(server).listen(port, () => {
    console.log(`> The REST server is running is running in port ${port}`)
  })
}

function setEndpoints(server: IExpress) {
  const router = Express.Router()
  APIRoutes.forEach((endpoint: Endpoint) => {
    endpoint.actions.forEach((action) => {
      switch (action.method) {
        case ('get'): {
          router.get(endpoint.url, action.func)
          break
        }
        case ('post'): {
          router.post(endpoint.url, action.func)
          break
        }
        case ('put'): {
          router.put(endpoint.url, action.func)
          break
        }
        case ('delete'): {
          router.delete(endpoint.url, action.func)
          break
        }
      }
    })
  })
  server.use('/', router)
}

async function setMiddlewares(server: IExpress) {
  server.use(Express.json())
  server.use(setAllowHeaders)
  server.use(Cors({ preflightContinue: false }))
  server.use(Express.urlencoded({ extended: true }))
  server.use('/health', returnHealthStatus)
  server.use('/docs/api', SwaggerUi.serve, SwaggerUi.setup(await SwaggerApi()))
  server.use(Multer({ storage: configureDiskStorage() }).array(Environments.fileFieldName))
  server.use(validateEndpoints)
}

function setAllowHeaders(_req: IRequest, res: IResponse, next: NextFunction) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Cache-Control, Authorization')
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE')
  next()
}

function returnHealthStatus(_req: IRequest, res: IResponse): void {
  res.status(200).send('OK').end()
}