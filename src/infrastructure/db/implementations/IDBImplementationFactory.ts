export type TDBFactoryImplementationType = ''

export interface IDBImplementationFactory {
  getImplementation<TImplementation>(type: TDBFactoryImplementationType): TImplementation
}
