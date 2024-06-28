import Dotenv from 'dotenv'
import { PasswordUtilities } from 'src/utils/password'

describe('Unitary Test for Password Utils', () => {
  beforeAll(() => {
    Dotenv.config()
  })

  test('Password strong test:', () => {
    const password = '3DVEStest#12'
    const passwordUtils = new PasswordUtilities()
    expect(passwordUtils.isPasswordStrong(password)).toBeTruthy()
  })

  test('Password weak test:', () => {
    const password = '123'
    const passwordUtils = new PasswordUtilities()
    const error = passwordUtils.isPasswordStrong(password)
    expect(Object.keys(error).length).toBeGreaterThan(0)
  })

  test('Generate password test:', async () => {
    const passwordUtils = new PasswordUtilities()
    const password = await passwordUtils.getRandomPassword()
    expect(password).not.toBeNull()
    expect(password).not.toEqual('')
  })

  test('Password incorrect test:', async () => {
    const password = '3DVEStest#12'
    const passwordUtils = new PasswordUtilities()
    const hash = await passwordUtils.getRandomPassword()
    const isCorrect = await passwordUtils.isCorrectPassword(password, hash)
    expect(isCorrect).toBeFalsy()
  })
})