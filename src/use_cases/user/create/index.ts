import { ModelUser } from 'src/models/ModelUser'
import { IDBImplementationFactory } from 'src/infrastructure/db/implementations/IDBImplementationFactory'
import { IDBUser } from 'src/infrastructure/db/implementations/postgreSQL/user/IDBUser'
import { getException } from 'src/utils/exceptions'
import { CryptoUtils } from 'src/utils/crypto'
import { MailUtils, IEmailUtils } from 'src/utils/mail'
import { UserLib } from 'src/use_cases/user/lib/validate'

export class UserCreateBusiness {
  private dbUser!: IDBUser
  private lib!: UserLib
  private cryptoUtils!: CryptoUtils
  private mailUtils!: IEmailUtils

  constructor(dbImplementationFactory: IDBImplementationFactory) {
    this.dbUser = dbImplementationFactory.getImplementation('user')
    this.lib = new UserLib()
    this.cryptoUtils = new CryptoUtils()
    this.mailUtils = new MailUtils()
  }

  public async create(user: ModelUser): Promise<ModelUser> {
    await this.validate(user)
    const userRecord = await this.dbUser.create({
      ...user,
      active: 1,
      password: await this.cryptoUtils.encrypt(user.password)
    })
    await this.sendEmail(user)
    return userRecord
  }

  private async validate(user: ModelUser): Promise<void> {
    const userExists = await this.dbUser.getByEmail(user.email)
    if(userExists) throw getException('forbidden', 'User already exists', 'UserCreateBusiness.validate')
    if(this.lib.validatePassword(user.password)) {
      throw getException('forbidden', 'Password is not strong', 'UserCreateBusiness.validate')
    }
  }

  private async sendEmail(user: ModelUser): Promise<void> {
    await this.mailUtils.sendMail({
      to: user.email,
      subject: `Welcome to our platform ${user.name}`,
      text: `Welcome to our platform ${user.name} ${user.lastname}`,
      html: `Welcome to our platform ${user.name} ${user.lastname}`
    })
  }
}