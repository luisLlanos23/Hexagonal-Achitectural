import Dotenv from 'dotenv'
import { Environments } from 'src/constants/Environment'
import { CryptoUtils } from 'src/utils/crypto'

describe('Unitary Test for CryptoUtils', () => {
  let passwordEncrypted = ''
  let token = ''
  beforeAll(() => {
    Dotenv.config()
  })

  test('Encrypt password test:', async () => {
    passwordEncrypted = await new CryptoUtils().encrypt('3DVEStest#12')
    expect(passwordEncrypted).not.toBeNull()
    expect(typeof passwordEncrypted).toEqual('string')
  })

  test('Token generator test:', () => {
    token = new CryptoUtils().tokenGenerator({ sub: 1, name: 'test' }, Environments.secretToken)
    expect(token).not.toBeNull()
    expect(typeof token).toEqual('string')
  })

  test('Is token live test:', () => {
    const isValidToken = new CryptoUtils().isTokenLive(token, Environments.secretToken)
    expect(isValidToken).toBeTruthy
  })

  test('Decrypt token test:', async () => {
    const passwordDesEncrypted = await new CryptoUtils().decrypt(token, Environments.secretToken)
    expect(passwordDesEncrypted).not.toBeNull()
    expect(passwordDesEncrypted.sub).toEqual(1)
    expect(passwordDesEncrypted.name).toEqual('test')
  })
})