import { DataSource, DataSourceOptions } from 'typeorm'
export type qType = 'insert' | 'update' | 'delete' | 'select'
export type TDBType = 'postgresql' | 'mongodb'

export interface IDBConnector {
  connect(connectionOptions: Partial<DataSourceOptions>, dbType: TDBType): Promise<void>
  disconnect(): Promise<void>
  getConnection(): DataSource
  reestablishConnection(): void
}