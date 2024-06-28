import Path from 'path'
import SwaggerJsdoc from 'swagger-jsdoc'
import { SystemExceptionCodes } from 'src/utils/exceptions/SystemExceptionCodes'
import { Environments } from 'src/constants/Environment'
import { version, name } from '../../../../package.json'

const swaggerDefinition: SwaggerJsdoc.SwaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: name,
    version,
    description: (
      Environments.environment === 'production'
        ? 'https://'
        : `localhost:${Environments.restPort}`
    )
  },
  security: [{ JWT: [] }],
  components: {
    securitySchemes: {
      JWT: {
        in: 'header',
        name: 'Authorization',
        type: 'apiKey'
      }
    },
    responses: {
      204: { description: 'No content' },
      500: {
        description: SystemExceptionCodes.unExpected.message,
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/exception'
            }
          }
        }
      }
    }
  },
  schemas: {
    exception: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        code: { type: 'string' },
        details: { type: 'string' }
      }
    }
  }
}

const options: SwaggerJsdoc.Options = {
  swaggerDefinition,
  apis: [
    Path.resolve(__dirname, '../controllers/*/Controller*.ts'),
    Path.resolve(__dirname, './components/*.yml'),
  ]
}

export default async (): Promise<Record<string, any>> => SwaggerJsdoc(options)