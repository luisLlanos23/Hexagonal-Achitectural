import { Response as IResponse } from 'express'
import { getException } from 'src/utils/exceptions'
import { ErrorHandlingTypes } from 'src/utils/exceptions/SystemExceptionCodes'

export abstract class AController {
  protected static handleError(error: Error | ErrorHandlingTypes.TException, res: IResponse): void {
    if (AController.isSystemException(error)) {
      return AController.sendError(error, res, error.httpCode ?? 500)
    }
    AController.sendError(
      getException('unExpected', error.message),
      res,
      500
    )
  }

  private static sendError(error: Error | ErrorHandlingTypes.TException, res: IResponse, status: number): void {
    if (!res.headersSent) {
      if (AController.isSystemException(error)) delete error.httpCode
      res.status(status).send({
        ...error,
        message: error.message
      }).end()
    }
  }

  private static isSystemException(error: Error | ErrorHandlingTypes.TException): error is ErrorHandlingTypes.TException {
    return !!(error as ErrorHandlingTypes.TException).code
  }
}