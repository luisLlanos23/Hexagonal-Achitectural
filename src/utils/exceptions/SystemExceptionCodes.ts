
import { Environments } from 'src/constants/Environment'

export type TExceptionKeys = keyof typeof SystemExceptionCodes

export declare namespace ErrorHandlingTypes {
  interface TException {
      httpCode?: number;
      code: string;
      details?: string;
      message: string;
  }
  type TExceptionRecords<T extends string = ''> = Record<T, Omit<TException, 'name'>>;
}

export type TKeys = 'unExpected'
  | 'invalidRequestInfo'
  | 'withoutPermissions'
  | 'notFound'
  | 'forbidden'
  | 'sourceNotFound'
  | 'dbError'
  | 'emptyResponse'
  | 'badRequest'

export const SystemExceptionCodes: ErrorHandlingTypes.TExceptionRecords<TKeys> = {
  unExpected: {
    code: `${Environments.exceptionApiName}-API-000`,
    httpCode: 500,
    message: 'Something goes wrong, please contact your administrator'
  },
  invalidRequestInfo: {
    code: `${Environments.exceptionApiName}-API-001`,
    httpCode: 400,
    message: 'The request is invalid'
  },
  withoutPermissions: {
    code: `${Environments.exceptionApiName}-API-002`,
    httpCode: 403,
    message: 'You dont have permissions'
  },
  forbidden: {
    code: `${Environments.exceptionApiName}-API-003`,
    httpCode: 403,
    message: 'Forbidden'
  },
  notFound: {
    code: `${Environments.exceptionApiName}-API-004`,
    httpCode: 404,
    message: 'Resource not found'
  },
  sourceNotFound: {
    code: `${Environments.exceptionApiName}-API-005`,
    httpCode: 404,
    message: 'The source was not found'
  },
  dbError: {
    code: `${Environments.exceptionApiName}-API-006`,
    httpCode: 404,
    message: 'Database error'
  },
  emptyResponse: {
    code: `${Environments.exceptionApiName}-API-007`,
    httpCode: 204,
    message: 'No response'
  },
  badRequest: {
    code: `${Environments.exceptionApiName}-API-008`,
    httpCode: 400,
    message: 'Bad request'
  }
}