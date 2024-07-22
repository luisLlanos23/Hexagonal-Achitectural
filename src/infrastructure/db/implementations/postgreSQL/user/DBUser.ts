import { DataSource } from 'typeorm'
import { ADB } from 'src/infrastructure/db/implementations/ADB'
import { DBConnectorFactory } from 'src/infrastructure/db/connector/DBConnectorFactory'
import { EntityUserPostgreSQL } from 'src/infrastructure/db/entities/postgresql/user/EntityUser'
import { IDBUser } from 'src/infrastructure/db/implementations/postgreSQL/user/IDBUser'
import { ModelUser } from 'src/models/ModelUser'

export class DBUser extends ADB implements IDBUser {
  private dataSource!: DataSource
  constructor() {
    super()
    this.dataSource = new DBConnectorFactory()
      .getConnector('postgresql')
      .getConnection()
  }

  public async create(userData: ModelUser): Promise<ModelUser> {
    try {
      const user = new EntityUserPostgreSQL(userData)
      return await this.dataSource.getRepository(EntityUserPostgreSQL).save(user)
    } catch (error) {
      throw super.handleDBImplError(error as Error, 'DBUser.create')
    }
  }

  public async getAll(): Promise<ModelUser[]> {
    try {
      return await this.dataSource.getRepository(EntityUserPostgreSQL).find({ where: { active: 1 }})
    } catch (error) {
      throw super.handleDBImplError(error as Error, 'DBUser.getAll')
    }
  }

  public async getById(id: number): Promise<ModelUser> {
    try {
      return await this.dataSource
        .getRepository(EntityUserPostgreSQL)
        .findOneBy({ id }) as ModelUser
    } catch (error) {
      throw super.handleDBImplError(error as Error, 'DBUser.get')
    }
  }

  public async getByEmail(email: string): Promise<ModelUser> {
    try {
      return await this.dataSource
        .getRepository(EntityUserPostgreSQL)
        .findOneBy({ email }) as ModelUser
    } catch (error) {
      throw super.handleDBImplError(error as Error, 'DBUser.getByEmail')
    }
  }

  public async update(userId: number, user: ModelUser): Promise<void> {
    try {
      return await this.dataSource
        .getRepository(EntityUserPostgreSQL)
        .update({ id: userId }, user) as unknown as void
    } catch (error) {
      throw super.handleDBImplError(error as Error, 'DBUser.update')
    }
  }

  public async delete(id: number): Promise<void> {
    try {
      return await this.dataSource
        .getRepository(EntityUserPostgreSQL)
        .update({ id }, { active: 0 }) as unknown as void
    } catch (error) {
      throw super.handleDBImplError(error as Error, 'DBUser.delete')
    }
  }
}