export type DBConnectionParameters = Partial<{
  host: string
  port: number
  ssl: boolean
  db: string
  schema: string
  password: string
  user: string
  connectionName: string
  synchronize: boolean
}> & {
  datasource: 'mongodb' | 'test'
}