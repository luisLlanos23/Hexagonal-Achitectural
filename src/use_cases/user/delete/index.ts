import { IDBImplementationFactory  } from 'src/infrastructure/db/implementations/IDBImplementationFactory'
import { IDBUser } from 'src/infrastructure/db/implementations/postgreSQL/user/IDBUser'
import { getException } from 'src/utils/exceptions'

export class UserDelateBusiness {
  private dbUser!: IDBUser
  constructor(dbImplementationFactory: IDBImplementationFactory) {
    this.dbUser = dbImplementationFactory.getImplementation('user')
  }

  public async delete(id: number, userId: number): Promise<void> {
    if (id !== userId) {
      if (!await this.checkIfUserIsAdmin(userId)) {
        throw getException('forbidden', 'You do not have permission to delete this user')
      }
    }
    return await this.dbUser.delete(id)
  }

  private async checkIfUserIsAdmin(userId: number): Promise<boolean> {
    const user = await this.dbUser.getById(userId)
    return user ? user.isAdmin : false
  }
}