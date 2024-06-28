import { Environments } from 'src/constants/Environment'
import { DBConnectorFactory } from 'src/infrastructure/db/connector/DBConnectorFactory'
import { getException } from 'src/utils/exceptions'

async function connectToTypeOrm(): Promise<any> {
  const connectorFactory = new DBConnectorFactory

  await connectorFactory.setConnector('postgresql', Environments.postgreSQLConnectionParams)
  connectorFactory.getConnector('postgresql')?.reestablishConnection()
  console.log('> Connect correctly to the Sivo PostgreSQL DB')

  await connectorFactory.setConnector('mongodb', Environments.mongoDBConnectionParams)
  connectorFactory.getConnector('mongodb')?.reestablishConnection()
  console.log('> Connect correctly to the Sivo MongoDB DB')
}

export async function setUpDB(): Promise<void> {
  try {
    await connectToTypeOrm()
  } catch (error) {
    getException('unExpected', new Error(error as unknown as string).message, 'setUpDB')
    process.exit(1)
  }
}