import { DataSource, DataSourceOptions } from 'typeorm'
import { IDBConnector, TDBType } from 'src/infrastructure/db/connector/IDBConnector'
import { EntityUserPostgreSQL } from 'src/infrastructure/db/entities/postgresql/user/EntityUser'

export class DBConnector implements IDBConnector {
  private connection!: DataSource
  private connectionType!: DataSourceOptions['type'] | undefined

  constructor(connectionType?: DataSourceOptions['type']) {
    this.connectionType = connectionType
  }

  public async connect(connectionOptions: DataSourceOptions, dbType: TDBType): Promise<void> {
    this.connection = await new DataSource({
      ...connectionOptions,
      type: this.connectionType,
      entities: this.getEntitiesByDbType(dbType)
    } as any).initialize()
  }

  private getEntitiesByDbType(dbType: TDBType) {
    switch (dbType) {
      case 'mongodb': return []
      case 'postgresql': return [
        EntityUserPostgreSQL
      ]
    }
  }

  public async disconnect(): Promise<void> {
    if (this.connection) {
      await this.connection.destroy()
    }
  }

  public getConnection(): DataSource {
    return this.connection
  }

  public reestablishConnection(): void {
    setInterval(async () => {
      if (!this.connection.isInitialized) {
        try {
          this.connection = await this.connection.initialize()
        } catch (error) { return }
      }
    }, 1000 * 5)
  }
}