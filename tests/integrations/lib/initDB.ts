import { DataSource } from 'typeorm'
import { ModelUser } from 'src/models/ModelUser'
import { EntityUserPostgreSQL } from 'src/infrastructure/db/entities/postgresql/user/EntityUser'

const mockUsers: Partial<ModelUser>[] = [
  {
    email: 'test@email.com',
    isAdmin: true,
    lastName: 'lastName test',
    name: 'name test',
    password: 'test'
  }
]

export async function initDB(datasource?: DataSource): Promise<void> {
  for (const user of mockUsers) {
    const userData = datasource?.getRepository(EntityUserPostgreSQL).create(user as any)
    await datasource?.getRepository(EntityUserPostgreSQL).save(userData as any)
  }
}
