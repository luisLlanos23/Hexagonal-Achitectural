import dotEnv from 'dotenv'
import { testConstants } from '../config/testConstants'
import { initServer } from './lib/initServer'
import { DockerInitializer } from '../utils/DockerInitializer'
import { DBImplementationFactory } from 'src/infrastructure/db/implementations/DBImplementationFactory'
import { postgresqlDBDockerContext, postgresqlDBImageOptions, postgresqlDBContainerOptions } from '../utils/postgreSQL/config'
import { TestPostgreSQLDBConfigurator } from '../config/db/TestPostgreSQLDBConfigurator'
import { DBConnectorFactory } from 'src/infrastructure/db/connector/DBConnectorFactory'
import { UserCreateBusiness } from 'src/use_cases/user/create'
import { LogInBusiness } from 'src/use_cases/user/logIn'
import { UserFinderBusiness } from 'src/use_cases/user/find'
import { UserUpdateBusiness } from 'src/use_cases/user/update'
import { UserDelateBusiness } from 'src/use_cases/user/delete'

const postgreSQLContainer = new DockerInitializer(postgresqlDBDockerContext, postgresqlDBImageOptions, postgresqlDBContainerOptions)

describe('Integration Test For User Business', () => {
  const dbConnectorFactory = new DBConnectorFactory()
  beforeAll(async () => {
    dotEnv.config({ path: testConstants.testEnvironmentsPath })
    await postgreSQLContainer.createContainer()
    await postgreSQLContainer.startContainer()
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(true)
      }, 9000)
    })
    await dbConnectorFactory.setConnector('postgresql')
    await new TestPostgreSQLDBConfigurator(dbConnectorFactory.getConnector('postgresql').getConnection()).init()
    initServer()
  })

  let userData = {
    name: 'Test User',
    lastName: 'Test User lastName',
    email: 'test@gmail.com',
    password: 'Unitary$13A03(',
    isAdmin: true,
    encryptPassword: ''
  }
  const dbImplementationFactory = new DBImplementationFactory()

  test('Create User', async () => {
    const userCreated = await new UserCreateBusiness(dbImplementationFactory).create({
      name: userData.name,
      lastName: userData.lastName,
      email: userData.email,
      password: userData.password,
      isAdmin: userData.isAdmin,
    })
    expect(userCreated).toBeDefined()
    expect(userCreated.id).toEqual(1)
    expect(userCreated.name).toEqual(userCreated.name)
    expect(userCreated.lastName).toEqual(userCreated.lastName)
    expect(userCreated.email).toEqual(userData.email)
    expect(userCreated.password).toBeDefined()
    expect(userCreated.isAdmin).toBeTruthy()
    userData.encryptPassword = userCreated.password
    userData['id'] = userCreated.id
  })

  test('Validate User Duplicated', async () => {
    try {
      await new UserCreateBusiness(dbImplementationFactory).create({
        name: userData.name,
        lastName: userData.lastName,
        email: userData.email,
        password: userData.password,
        isAdmin: false
      })
    } catch (error) {
      expect(error).toBeDefined()
      const errorParsed = JSON.parse(JSON.stringify(error))
      expect(errorParsed.httpCode).toEqual(403)
      expect(errorParsed.details).toEqual('User already exists')
    }
  })

  test('Log In Forbidden Invalid Password', async () => {
    try {
      await new LogInBusiness(dbImplementationFactory).logIn(userData.email, 'WrongPassword')
    } catch (error) {
      expect(error).toBeDefined()
      const errorParsed = JSON.parse(JSON.stringify(error))
      expect(errorParsed.httpCode).toEqual(403)
      expect(errorParsed.details).toEqual('Password is not correct')
    }
  })

  test('Log In', async () => {
    const result = await new LogInBusiness(dbImplementationFactory).logIn(userData.email, userData.password)
    expect(result).toBeDefined()
    expect(result.token).toBeDefined()
  })

  test('Get All Users', async () => {
    const users = await new UserFinderBusiness(dbImplementationFactory).find()
    expect(users.length).toEqual(1)
    users.forEach(user => {
      expect(user).toBeDefined()
      expect(user.id).toEqual(1)
      expect(user.name).toEqual(userData.name)
      expect(user.lastName).toEqual(userData.lastName)
      expect(user.email).toEqual(userData.email)
    })
  })

  test('Get Me', async () => {
    const user = await new UserFinderBusiness(dbImplementationFactory).findMe(1)
    expect(user).toBeDefined()
    expect(user.id).toEqual(1)
    expect(user.name).toEqual(userData.name)
    expect(user.lastName).toEqual(userData.lastName)
    expect(user.email).toEqual(userData.email)
  })

  test('Update User Info', async () => {
    const userUpdated = await new UserUpdateBusiness(dbImplementationFactory).update(userData['id'], {
      name: 'Test User Updated',
      lastName: 'Test User lastName Updated'
    })
    expect(userUpdated).toBeDefined()
    expect(userUpdated.name).toContain('Updated')
    expect(userUpdated.lastName).toContain('Updated')
  })

  test('Update User Password', async () => {
    const userUpdated = await new UserUpdateBusiness(dbImplementationFactory).update(userData['id'], {
      password: 'UnitaryUpdated$13A03('
    })
    expect(userUpdated).toBeDefined()
    expect(userUpdated.password).toBeDefined()
    expect(userUpdated.password).not.toEqual(userData.encryptPassword)
    userData.password = 'UnitaryUpdated$13A03('
  })

  test('Delete User Forbidden', async () => {
    try {
      await new UserDelateBusiness(dbImplementationFactory).delete(userData['id'], { id: 2, isAdmin: false })
    } catch (error) {
      expect(error).toBeDefined()
      const errorParsed = JSON.parse(JSON.stringify(error))
      expect(errorParsed.httpCode).toEqual(403)
      expect(errorParsed.details).toEqual('You do not have permission to delete this user')
    }
  })

  test('Delete User', async () => {
    await new UserDelateBusiness(dbImplementationFactory).delete(userData['id'], { id: userData['id'], isAdmin: true })
    const users = await new UserFinderBusiness(dbImplementationFactory).find()
    expect(users.length).toEqual(0)
  })

  test('Login Forbidden - User Not Activated', async () => {
    try {
      await new LogInBusiness(dbImplementationFactory).logIn(userData.email, userData.password)
    } catch (error) {
      expect(error).toBeDefined()
      const errorParsed = JSON.parse(JSON.stringify(error))
      expect(errorParsed.httpCode).toEqual(404)
      expect(errorParsed.details).toEqual('User not found')
    }
  })

  afterAll(async () => {
    dbConnectorFactory.getConnector('postgresql').disconnect()
    await postgreSQLContainer.pruneContainer()
  })
})
