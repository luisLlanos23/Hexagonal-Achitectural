import { IDBImplementationFactory } from 'src/infrastructure/db/implementations/IDBImplementationFactory'
import { IDBUser } from 'src/infrastructure/db/implementations/postgreSQL/user/IDBUser'
import { TokenUtils } from 'src/use_cases/user/lib/token'
import { PasswordUtilities } from 'src/utils/password'
import { getException } from 'src/utils/exceptions'
import { CryptoUtils } from 'src/utils/crypto/index';
import { Environments } from 'src/constants/Environment'

export class LogInBusiness {
  private dbUser!: IDBUser
  private passwordUtilities!: PasswordUtilities
  private tokenUtils!: TokenUtils
  private cryptoUtils!: CryptoUtils

  constructor(dbImplementationFactory: IDBImplementationFactory) {
    this.dbUser = dbImplementationFactory.getImplementation('user')
    this.passwordUtilities = new PasswordUtilities()
    this.tokenUtils = new TokenUtils()
    this.cryptoUtils = new CryptoUtils()
  }

  public async logIn(email: string, password: string): Promise<{ token: string }> {
    const user = await this.dbUser.getByEmail(email)
    if(!user || !user.deleted_at == null) throw getException('notFound', 'User not found', 'LogInBusiness.logIn')
    if(!await this.passwordUtilities.isCorrectPassword(password, user.password)) {
      throw getException('forbidden', 'Password is not correct', 'LogInBusiness.logIn')
    }
    const token = this.tokenUtils.generateToken(user)
    await this.dbUser.update(user.id, {
      tokenExpiration : this.cryptoUtils.decrypt(token, Environments.secretToken).exp
    })
    return { token }
  }
}