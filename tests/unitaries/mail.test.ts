import dotEnv from 'dotenv'
import { testConstants} from '../config/testConstants'
import { MailUtils }  from 'src/utils/mail'

describe('Unitary Test for  MailUtils', () => {
  beforeAll(() => {
    dotEnv.config({
      path: testConstants.testEnvironmentsPath
    })
  })

  const options = {
    from: 'luiscorporativo547@gmail.com',
    to: 'kaosInf@outlook.es',
    subject: 'Test Email',
    text: 'This is a test email',
    html: '<p>This is a test email</p>'
  }

  test('Should send an email successfully', async () => {
    await expect(new MailUtils().sendMail(options)).resolves.toBeTruthy()
  })

  test('Should throw an error if sending an email fails', async () => {
    new MailUtils().sendMail = jest.fn().mockRejectedValueOnce(new Error('Resource not found'))
  })
})