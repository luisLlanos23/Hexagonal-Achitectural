import { ModelUser } from 'src/models/ModelUser'

export interface IDBUser {
  /**
  * Create a new user
  * @param user User data to create
  */
  create(user: ModelUser): Promise<ModelUser>
  /**
   * Get all users
   */
  getAll(): Promise<ModelUser[]>
  /**
   * Get a user by id
   * @param id User id to get
   */
  getById(id: number): Promise<ModelUser>
  /**
   * Get a user by email
   * @param email User email to get
   */
  getByEmail(email: string): Promise<ModelUser>
  /**
   * Update a user
   * @param userId User id
   * @param user User data to update
   */
  update(userId: number, user: ModelUser): Promise<void>
  /**
   * Delete a user
   * @param id User id to delete
   */
  delete(id: number): Promise<void>
}