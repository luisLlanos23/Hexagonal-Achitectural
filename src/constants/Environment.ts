import { DBConnectionParameters } from 'src/infrastructure/db/connector/types'

export const Environments = {
  fileFieldName: 'template',
  exceptionApiName: 'TEMPLATE',
  get environment(): string {
    return process.env.NODE_ENV || 'development'
  },
  get restPort(): number {
    return parseInt(process.env.SERVER_REST_PORT || '4000')
  },
  get postgreSQLConnectionParams(): DBConnectionParameters {
    return JSON.parse(process.env.POSTGRESQL_DB ?? '{}')
  },
  get mongoDBConnectionParams(): DBConnectionParameters {
    return JSON.parse(process.env.MONGODB_DB ?? '{}')
  },
  get secretToken(): string {
    return process.env.SECRET_TOKEN || 'secret'
  }
}