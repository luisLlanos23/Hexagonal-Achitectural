import { Endpoint } from 'src/infrastructure/rest/types'
import { ControllerUser } from 'src/infrastructure/rest/controllers/user/ControllerUser'

export const UserEndpoints: Array<Endpoint> = [
  {
    url: '/users',
    actions: [
      { method: 'post', func: ControllerUser.create },
      { method: 'get', func: ControllerUser.getAll }
    ]
  },
  {
    url: '/register',
    actions: [
      { method: 'post', func: ControllerUser.register }
    ]
  },
  {
    url: '/logIn',
    actions: [
      { method: 'post', func: ControllerUser.logIn }
    ]
  },
  {
    url: '/me',
    actions: [
      { method: 'get', func: ControllerUser.getMe }
    ]
  },
  {
    url: '/users/:id',
    actions: [
      { method: 'put', func: ControllerUser.update },
      { method: 'delete', func: ControllerUser.delete },
      { method: 'patch', func: ControllerUser.restoreUser }
    ]
  }
]