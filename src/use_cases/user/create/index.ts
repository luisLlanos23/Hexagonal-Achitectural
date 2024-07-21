import { ModelUser } from 'src/models/ModelUser'
import { IDBUser } from 'src/infrastructure/db/implementations/postgreSQL/user/IDBUser'
import { IDBImplementationFactory } from 'src/infrastructure/db/implementations/IDBImplementationFactory'

export class UserCreateBusiness {
  private dbUser!: IDBUser

  constructor(dbImplementationFactory: IDBImplementationFactory) {
    this.dbUser = dbImplementationFactory.getImplementation('user')
  }

  public async create(user: ModelUser): Promise<ModelUser> {
    return await this.dbUser.create(user)
  }
}