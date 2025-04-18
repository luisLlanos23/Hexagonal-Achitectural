import 'express'

declare global {
  namespace Express {
    interface Request {
      userMetadata: {
        id: number
        email: string
        isAdmin: boolean
        exp: Date
      }
    }
  }
}

export { }