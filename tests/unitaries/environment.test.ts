import Dotenv from 'dotenv'
import { Environments } from 'src/constants/Environment'

describe('Unitary Test for Environment', () => {
  beforeAll(() => {
    Dotenv.config()
  })

  test('Environment variables test:', () => {
    expect(Environments.restPort).not.toBeNull()
    expect(Environments.restPort).toEqual(Number(process.env.SERVER_REST_PORT))
    expect(Environments.secretToken).not.toBeNull()
    expect(Environments.secretToken).toEqual(process.env.SECRET_TOKEN)
    expect(Environments.postgreSQLConnectionParams).not.toBeNull()
    expect(Environments.postgreSQLConnectionParams).toEqual(JSON.parse(process.env.POSTGRESQL_DB ?? '{}'))
    expect(Environments.mongoDBConnectionParams).not.toBeNull()
    expect(Environments.mongoDBConnectionParams).toEqual(JSON.parse(process.env.MONGODB_DB ?? '{}'))
  })
})