import { DataSourceOptions } from 'typeorm'
import { IDBConnector } from 'src/infrastructure/db/connector/IDBConnector'
import { DBConnector } from 'src/infrastructure/db/connector/DBConnector'
import { DBConnectionParameters } from './types'

const connectionsMap: Map<string, IDBConnector> = new Map()
type ConnectorType = 'postgresql' | 'mongodb'

export class DBConnectorFactory {
  public getConnector(type: ConnectorType): IDBConnector {
    return connectionsMap.get(type) as IDBConnector
  }

  async setConnector(type: ConnectorType, parameters: DBConnectionParameters): Promise<void> {
    let connector: IDBConnector
    let connectionOpts: Partial<DataSourceOptions>
    switch (type) {
      case ('postgresql'): {
        connectionOpts = this.getParsedConnectionParams(parameters, type)
        connector = new DBConnector('postgres')
        break
      }
      case ('mongodb'): {
        connectionOpts = this.getParsedConnectionParams(parameters, type)
        connector = new DBConnector('mongodb')
        break
      }
    }
    await connector.connect(connectionOpts, type)
    connectionsMap.set(type, connector)
  }

  public getParsedConnectionParams(connectionParams: DBConnectionParameters, connectionName: string): Partial<DataSourceOptions> {
    return {
      synchronize: false,
      name: connectionName,
      host: connectionParams.host as string,
      port: connectionParams.port as number,
      ssl: !!connectionParams.ssl,
      database: connectionParams.db as string,
      password: connectionParams.password as string,
      username: connectionParams.user as string,
      logging: false,
      pool: true,
      useUnifiedTopology: true,
    } as Partial<DataSourceOptions>
  }
}