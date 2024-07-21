export type TDBFactoryImplementationType = 'user'

export interface IDBImplementationFactory {
  getImplementation<TImplementation>(type: TDBFactoryImplementationType): TImplementation
}
