import { ModelUser } from 'src/models/ModelUser'
import { IDBImplementationFactory } from 'src/infrastructure/db/implementations/IDBImplementationFactory'
import { IDBUser } from 'src/infrastructure/db/implementations/postgreSQL/user/IDBUser'
import { getException } from 'src/utils/exceptions'
import { CryptoUtils } from 'src/utils/crypto'
import { TokenUtils } from 'src/use_cases/user/lib/token'
import { MailUtils, IEmailUtils } from 'src/utils/mail'
import { UserLib } from 'src/use_cases/user/lib/validate'
import { Environments } from 'src/constants/Environment'

export class UserCreateBusiness {
  private dbUser!: IDBUser
  private lib!: UserLib
  private cryptoUtils!: CryptoUtils
  private mailUtils!: IEmailUtils
  private tokenUtils!: TokenUtils

  constructor(dbImplementationFactory: IDBImplementationFactory) {
    this.dbUser = dbImplementationFactory.getImplementation('user')
    this.lib = new UserLib()
    this.cryptoUtils = new CryptoUtils()
    this.mailUtils = new MailUtils()
    this.tokenUtils = new TokenUtils()
  }

  public async register(userPayload: Omit<ModelUser, 'id'>): Promise<Partial<ModelUser> & { token: string }> {
    const user = await this.create(userPayload)
    const token = this.tokenUtils.generateToken(user)
    await this.setExpirationToken(token)
    return {
      id: user.id,
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      token
    }
  }

  public async create(user: Omit<ModelUser, 'id'>): Promise<ModelUser> {
    await this.validate(user)
    const userRecord = await this.dbUser.create({
      ...user,
      password: await this.cryptoUtils.encrypt(user.password)
    })
    await this.sendEmail(user)
    return userRecord
  }

  private async validate(user:  Omit<ModelUser, 'id'>): Promise<void> {
    const userExists = await this.dbUser.getByEmail(user.email)
    if(userExists) throw getException('forbidden', 'User already exists', 'UserCreateBusiness.validate')
    if(!this.lib.validatePassword(user.password)) {
      throw getException('forbidden', 'Password is not strong', 'UserCreateBusiness.validate')
    }
  }

  private async sendEmail(user: Omit<ModelUser, 'id'>): Promise<void> {
    await this.mailUtils.sendMail({
      to: user.email,
      subject: `Welcome to our platform ${user.name}`,
      text: `Welcome to our platform ${user.name} ${user.lastName}`,
      html: `Welcome to our platform ${user.name} ${user.lastName}`
    })
  }

  private async setExpirationToken(token) {
    const tokenDecoded = await this.cryptoUtils.decrypt(token, Environments.secretToken)
    const tokenExpiration = new Date(tokenDecoded.exp * 1000)
    await this.dbUser.update(tokenDecoded.sub, { tokenExpiration })
  }
}