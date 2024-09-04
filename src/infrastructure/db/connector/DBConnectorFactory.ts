import { DataSourceOptions } from 'typeorm'
import { IDBConnector } from 'src/infrastructure/db/connector/IDBConnector'
import { DBConnector } from 'src/infrastructure/db/connector/DBConnector'
import { DBConnectionParameters } from 'src/infrastructure/db/connector/types'
import { Environments } from 'src/constants/Environment'

const connectionsMap: Map<string, IDBConnector> = new Map()
type ConnectorType = 'postgresql' | 'mongodb'

export class DBConnectorFactory {
  public getConnector(type: ConnectorType): IDBConnector {
    return connectionsMap.get(type) as IDBConnector
  }

  async setConnector(type: ConnectorType): Promise<void> {
    let connector: IDBConnector
    let connectionOpts: Partial<DataSourceOptions>
    switch (type) {
      case 'postgresql': {
        connectionOpts = this.getParsedConnectionParams(
          Environments.postgreSQLConnectionParams,
          type
        )
        connector = new DBConnector('postgres')
        break
      }
      case 'mongodb': {
        connectionOpts = this.getParsedConnectionParams(
          Environments.mongoDBConnectionParams,
          type
        )
        connector = new DBConnector('mongodb')
        break
      }
    }
    await connector.connect(connectionOpts, type)
    connectionsMap.set(type, connector)
  }

  public getParsedConnectionParams(connectionParams: DBConnectionParameters, connectionName: string): Partial<DataSourceOptions> {
    return {
      synchronize: connectionParams.synchronize,
      name: connectionName,
      host: connectionParams.host as string,
      port: connectionParams.port as number,
      ssl: connectionParams.ssl ? { rejectUnauthorized: true } : false,
      database: connectionParams.db as string,
      password: connectionParams.password as string,
      username: connectionParams.user as string,
      logging: false,
      pool: true,
      useUnifiedTopology: true,
      extra: {
        ssl: connectionParams.ssl ? { rejectUnauthorized: false } : false,
      },
    } as Partial<DataSourceOptions>
  }
}