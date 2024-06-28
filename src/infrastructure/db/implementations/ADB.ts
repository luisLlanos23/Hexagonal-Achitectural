import { TypeORMError } from 'typeorm'
import { getException } from 'src/utils/exceptions'

export abstract class ADB {
  protected handleDBImplError<T extends TypeORMError>(error: T): void {
    throw getException('dbError', error.message)
  }

  protected getGenericMongoSearchCriteria(criteria: Record<string, unknown>): Record<string, unknown> {
    const searchCriteria = {}
    Object.keys(criteria).forEach((key) => {
      if (Array.isArray(criteria[key])) {
        searchCriteria[key] = { $in: criteria[key] }
      } else {
        searchCriteria[key] = criteria[key]
      }
    })
    return searchCriteria
  }
}