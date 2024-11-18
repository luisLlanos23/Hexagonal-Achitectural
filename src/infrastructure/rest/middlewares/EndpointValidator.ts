import _ from 'lodash'
import moment from 'moment'
import {
  Request as IRequest,
  Response as IResponse,
  NextFunction as INextFunction
} from 'express'
import { Environments } from  'src/constants/Environment'
import { CryptoUtils } from 'src/utils/crypto'
import { getException } from 'src/utils/exceptions'

export function validateEndpoints(req: IRequest, res: IResponse, next: INextFunction): void {
  try {
    if (req.method === 'OPTIONS') return next()
    if ((req.path === '/login' || req.path === '/logIn') && req.method === 'POST') return next()
    if (req.path === '/user' && req.method === 'POST') return next()
    validateAuthorization(req)
    next()
  } catch (error) {
    res.status(500).send(
      getException(
        'invalidRequestInfo',
        (error as { details: string }).details,
        'Middleware.validateEndpoint'
      )
    ).end()
  }
}

function validateAuthorization(req: IRequest) {
  if (_.isString(req.headers.authorization)) {
    const payload = new CryptoUtils().decrypt(
      req.headers.authorization, Environments.secretToken
    )
    if (payload.exp <= moment().unix()) throw getException('forbidden', 'Your token expired')
    req.user = payload.sub
  } else {
    throw getException(
      'forbidden',
      'Your request doesnt have authorization header',
      'Middleware.validateAuthorization'
    )
  }
}