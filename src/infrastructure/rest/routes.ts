import { Endpoint } from 'src/infrastructure/rest/types'
import { UserEndpoints } from 'src/infrastructure/rest/controllers/user/Endpoints'

export const APIRoutes: Array<Endpoint> = [
  ...UserEndpoints
]