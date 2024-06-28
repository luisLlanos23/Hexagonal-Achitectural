import { IDBImplementationFactory, TDBFactoryImplementationType } from 'src/infrastructure/db/implementations/IDBImplementationFactory'

export class DBImplementationFactory implements IDBImplementationFactory {
  getImplementation<TImplementation>(type: TDBFactoryImplementationType): TImplementation {
    switch (type) {
      case '':
        return {} as TImplementation
    }
  }
}