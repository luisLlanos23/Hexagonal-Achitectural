import { ErrorHandlingTypes, SystemExceptionCodes } from 'src/utils/exceptions/SystemExceptionCodes'
import { PackageException } from 'src/utils/exceptions/PackageException'
import { buildLogger } from 'src/utils/logger'

type TExceptionKeys = keyof typeof Exceptions
export const Exceptions = {
  ...SystemExceptionCodes,
}
export function getException(errorKey: TExceptionKeys, detail?: string, origin?: string): ErrorHandlingTypes.TException {
  const logger = buildLogger(origin ?? 'getException')
  logger.error(`${errorKey} - ${detail}`)
  return new PackageException(errorKey as string, Exceptions, detail)
}
