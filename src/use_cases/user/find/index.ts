import { IDBImplementationFactory  } from 'src/infrastructure/db/implementations/IDBImplementationFactory'
import { IDBUser } from 'src/infrastructure/db/implementations/postgreSQL/user/IDBUser'
import { ModelUser } from 'src/models/ModelUser'

export class UserFinderBusiness {
  private dbUser!: IDBUser

  constructor(dbImplementationFactory: IDBImplementationFactory) {
    this.dbUser = dbImplementationFactory.getImplementation('user')
  }

  public async find(): Promise<Array<ModelUser>> {
    return await this.dbUser.getAll()
  }

  public async findById(id: number): Promise<ModelUser> {
    return await this.dbUser.getById(id)
  }
}