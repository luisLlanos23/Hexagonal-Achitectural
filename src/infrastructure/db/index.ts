import { DBConnectorFactory } from 'src/infrastructure/db/connector/DBConnectorFactory'
import { Environments } from 'src/constants/Environment'
import { getException } from 'src/utils/exceptions'
import { buildLogger } from 'src/utils/logger'

async function connectToTypeOrm(): Promise<any> {
  const logger = buildLogger('connectToTypeOrm')
  const connectorFactory = new DBConnectorFactory

  await connectorFactory.setConnector('postgresql')
  connectorFactory.getConnector('postgresql')?.reestablishConnection()
  logger.log(`Connect correctly to the ${Environments.postgreSQLConnectionParams.db} PostgreSQL DB`)

  await connectorFactory.setConnector('mongodb')
  connectorFactory.getConnector('mongodb')?.reestablishConnection()
  logger.log(`Connect correctly to the ${Environments.mongoDBConnectionParams.db} Mongo DB`)
}

export async function setUpDB(): Promise<void> {
  try {
    await connectToTypeOrm()
  } catch (error) {
    console.log(error)
    getException('unExpected', new Error(error as unknown as string).message, 'setUpDB')
    process.exit(1)
  }
}