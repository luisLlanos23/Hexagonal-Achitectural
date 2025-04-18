export type ModelUser = {
  id: number
  name: string
  lastName: string
  email: string
  password: string
  isAdmin: boolean
  tokenExpiration?: Date
  created_at?: Date
  updated_at?: Date
  deleted_at?: Date
}