import nodeMailer from 'nodemailer'
import { Environments } from 'src/constants/Environment'
import { getException } from 'src/utils/exceptions'
import { TSendEmail, IEmailUtils } from 'src/utils/mail/types'

export * from 'src/utils/mail/types'

export class MailUtils implements IEmailUtils {
  private transporter = nodeMailer.createTransport({
    service: Environments.mailerConfig.service,
    auth: {
      user: Environments.mailerConfig.email,
      pass: Environments.mailerConfig.secretKey
    }
  })

  public async sendMail(options: TSendEmail) {
    try {
      return await this.transporter.sendMail(options)
    } catch (error) {
      throw getException('notFound', error as unknown as string, 'mailUtils.sendMail')
    }
  }
}