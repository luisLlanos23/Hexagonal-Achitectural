import { IDBImplementationFactory, TDBFactoryImplementationType } from 'src/infrastructure/db/implementations/IDBImplementationFactory'
import { DBUser } from 'src/infrastructure/db/implementations/postgreSQL/user/DBUser'

export class DBImplementationFactory implements IDBImplementationFactory {
  getImplementation<TImplementation>(type: TDBFactoryImplementationType): TImplementation {
    switch (type) {
      case 'user':
        return new DBUser() as unknown as TImplementation
    }
  }
}