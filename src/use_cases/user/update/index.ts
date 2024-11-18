import { IDBImplementationFactory } from 'src/infrastructure/db/implementations/IDBImplementationFactory'
import { IDBUser } from 'src/infrastructure/db/implementations/postgreSQL/user/IDBUser'
import { ModelUser } from 'src/models/ModelUser'
import { UserLib } from 'src/use_cases/user/lib/validate'
import { CryptoUtils } from 'src/utils/crypto'
import { MailUtils, IEmailUtils } from 'src/utils/mail'

export class UserUpdateBusiness {
  private dbUser!: IDBUser
  private lib!: UserLib
  private cryptoUtils!: CryptoUtils
  private mailUtils!: IEmailUtils

  constructor(dbImplementationFactory: IDBImplementationFactory) {
    this.dbUser = dbImplementationFactory.getImplementation('user')
    this.cryptoUtils = new CryptoUtils()
    this.lib = new UserLib()
    this.mailUtils = new MailUtils()
  }

  public async update(userId: number, userData: Partial<ModelUser>): Promise<ModelUser> {
    let password = ''
    if(userData.password) {
      const newPassword = await this.passwordHandler(userData.password)
      password = userData.password
      userData.password = newPassword
    }
    await this.dbUser.update(userId, userData)
    const userRecord = await this.dbUser.getById(userId)
    if(userData.password) await this.sendNewPassword(userRecord.email, password)
    return userRecord
  }

  private async passwordHandler(password: string): Promise<string> {
    if(!this.lib.validatePassword(password)) {
      throw new Error('Password is not strong')
    }
    return await this.cryptoUtils.encrypt(password)
  }

  private async sendNewPassword(email: string, password: string): Promise<void> {
    await this.mailUtils.sendMail({
      to: email,
      subject: 'Update your password successfully',
      text: `Password updated successfully. Your new password is ${password}`,
      html: `<b>Password updated successfully. Your new password is (${password})</b>`
    })
  }
}