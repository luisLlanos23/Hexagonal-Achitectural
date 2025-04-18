import { IDBImplementationFactory  } from 'src/infrastructure/db/implementations/IDBImplementationFactory'
import { IDBUser } from 'src/infrastructure/db/implementations/postgreSQL/user/IDBUser'
import { getException } from 'src/utils/exceptions'

export class RestoreUserBusiness {
  private dbUser: IDBUser

  constructor(dbImplementationFactory: IDBImplementationFactory) {
    this.dbUser = dbImplementationFactory.getImplementation('user')
  }

  public async restore(userId: number, userSessionMetaData: { id: number, isAdmin: boolean }): Promise<any> {
    if (userId !== userSessionMetaData.id && !userSessionMetaData.isAdmin) {
      throw getException('forbidden', 'You are not allowed to restore this user')
    }
    return await this.dbUser.restore(userId)
  }
}