import { Environments } from 'src/constants/Environment'
import { IDBImplementationFactory } from 'src/infrastructure/db/implementations/IDBImplementationFactory'
import { IDBUser } from 'src/infrastructure/db/implementations/postgreSQL/user/IDBUser'
import { ModelUser } from 'src/models/ModelUser'
import { CryptoUtils } from 'src/utils/crypto'
import { PasswordUtilities } from 'src/utils/password'
import { getException } from 'src/utils/exceptions'

export class LogInBusiness {
  private dbUser!: IDBUser
  private passwordUtilities!: PasswordUtilities
  private crypto!: CryptoUtils

  constructor(dbImplementationFactory: IDBImplementationFactory) {
    this.dbUser = dbImplementationFactory.getImplementation('user')
    this.passwordUtilities = new PasswordUtilities()
    this.crypto = new CryptoUtils()
  }

  public async logIn(email: string, password: string): Promise<{ token: string }> {
    const user = await this.dbUser.getByEmail(email)
    if(!user || user.active == 0) throw getException('notFound', 'User not found', 'LogInBusiness.logIn')
    if(!await this.passwordUtilities.isCorrectPassword(password, user.password)) {
      throw getException('forbidden', 'Password is not correct', 'LogInBusiness.logIn')
    }
    return { token: this.generateToken(user) }
  }

  private generateToken(user: ModelUser): string {
    return this.crypto.tokenGenerator({
      sub: user.id,
      name: user.name
    }, Environments.secretToken)
  }
}