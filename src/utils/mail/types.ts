export interface IEmailUtils {
  sendMail(options: TSendEmail): Promise<any>
}

export type TSendEmail = {
  to: string | string[]
  subject: string
  text: string
  html: string
  attachments?: TAttachment[]
}

export type TAttachment = {
  filename: string
  path: string
}
