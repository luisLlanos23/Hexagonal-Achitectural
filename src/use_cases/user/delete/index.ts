import { IDBImplementationFactory  } from 'src/infrastructure/db/implementations/IDBImplementationFactory'
import { IDBUser } from 'src/infrastructure/db/implementations/postgreSQL/user/IDBUser'
import { getException } from 'src/utils/exceptions'

export class UserDelateBusiness {
  private dbUser!: IDBUser
  constructor(dbImplementationFactory: IDBImplementationFactory) {
    this.dbUser = dbImplementationFactory.getImplementation('user')
  }

  public async delete(userId: number, userSessionMetadata: { id: number; isAdmin: boolean }): Promise<void> {
    if (userId !== userSessionMetadata.id && !userSessionMetadata.isAdmin) {
      throw getException('forbidden', 'You are not allowed to delete this user')
    }
    return await this.dbUser.delete(userId)
  }
}