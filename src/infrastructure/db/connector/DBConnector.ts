import { DataSource, DataSourceOptions } from 'typeorm'
import { IDBConnector, TDBType } from 'src/infrastructure/db/connector/IDBConnector'

export class DBConnector implements IDBConnector {
  private connection!: DataSource
  private conenctionType!: DataSourceOptions['type'] | undefined

  constructor(connectionType?: DataSourceOptions['type']) {
    this.conenctionType = connectionType
  }

  public async connect(connectionOptions: DataSourceOptions, dbType: TDBType): Promise<void> {
    this.connection = await new DataSource({
      ...connectionOptions,
      type: this.conenctionType,
      entities: this.getEntitiesByDbType(dbType)
    } as any).initialize()
  }

  private getEntitiesByDbType(dbType: TDBType) {
    switch (dbType) {
      case 'mongodb': return []
      case 'postgresql': return []
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