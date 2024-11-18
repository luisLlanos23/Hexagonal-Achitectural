import { DataSource, QueryRunner, Table, Entity } from 'typeorm'
import { DBConnector } from 'src/infrastructure/db/connector/DBConnector'
import { DBConnectorFactory } from 'src/infrastructure/db/connector/DBConnectorFactory'

export class TestPostgreSQLDBConfigurator {
  private queryRunner: QueryRunner

  constructor(datasource: DataSource) {
    this.queryRunner = datasource.createQueryRunner()
  }

  public async init(): Promise<void> {
    const dbConnector = new DBConnector()
    const dbConnectorFactory = new DBConnectorFactory()
    for (const entity of dbConnector.getEntitiesByDbType('postgresql') ?? []) {
      await this.createModels( dbConnectorFactory.getConnector('postgresql').getConnection(), entity as any )
    }
    for (const entity of dbConnector.getEntitiesByDbType('mongodb') ?? []) {
      await this.createModels( dbConnectorFactory.getConnector('mongodb').getConnection(), entity as any )
    }
  }

  private async createModels(dataSource: DataSource, entity: typeof Entity): Promise<void> {
    const metadata = dataSource.getMetadata(entity)
    await this.queryRunner.createSchema(metadata.schema ?? 'public', true)
    await this.queryRunner.createTable(
      new Table({
        name: metadata.tableName,
        schema: metadata.schema,
        columns: metadata.columns.map((c) => ({
          ...c,
          name: c.propertyName,
          type: c.type.toString(),
          enum: c.enum as any,
        })),
      }),
      true
    )
  }
}
