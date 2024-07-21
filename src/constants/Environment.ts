import { DBConnectionParameters } from 'src/infrastructure/db/connector/types'

export class Environments {
  public static get fileFieldName() { return 'template' }
  public static get exceptionApiName() { return 'TEMPLATE' }
  public static get environment(): string { return process.env.NODE_ENV || 'development' }
  public static get restPort(): number { return parseInt(process.env.SERVER_REST_PORT || '4000') }
  public static get postgreSQLConnectionParams(): DBConnectionParameters { return JSON.parse(process.env.POSTGRESQL_DB ?? '{}') }
  public static get mongoDBConnectionParams(): DBConnectionParameters { return JSON.parse(process.env.MONGODB_DB ?? '{}') }
  public static get secretToken(): string { return process.env.SECRET_TOKEN || 'secret' }
}