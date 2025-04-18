import { IDBImplementationFactory  } from 'src/infrastructure/db/implementations/IDBImplementationFactory'
import { IDBUser } from 'src/infrastructure/db/implementations/postgreSQL/user/IDBUser'
import { ModelUser } from 'src/models/ModelUser'

export class UserFinderBusiness {
  private dbUser!: IDBUser
  constructor(dbImplementationFactory: IDBImplementationFactory) {
    this.dbUser = dbImplementationFactory.getImplementation('user')
  }

  public async find(): Promise<Array<Partial<ModelUser>>> {
    return (await this.dbUser.getAll()).map((user) => {
      return {
        id: user.id,
        email: user.email,
        name: user.name,
        lastName: user.lastName,
      }
    })
  }

  public async findMe(id: number): Promise<Partial<ModelUser>> {
    const user = await this.dbUser.getById(id)
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      lastName: user.lastName,
      isAdmin: user.isAdmin,
      tokenExpiration: user.tokenExpiration,
      created_at: user.created_at,
      updated_at: user.updated_at,
      deleted_at: user.deleted_at,
    }
  }
}