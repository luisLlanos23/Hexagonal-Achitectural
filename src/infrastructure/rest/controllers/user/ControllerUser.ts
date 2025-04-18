import { Request as IRequest, Response as IResponse } from 'express'
import { AController } from 'src/infrastructure/rest/AController'
import { DBImplementationFactory } from 'src/infrastructure/db/implementations/DBImplementationFactory'
import { UserCreateBusiness } from 'src/use_cases/user/create'
import { UserFinderBusiness } from 'src/use_cases/user/find'
import { LogInBusiness } from 'src/use_cases/user/logIn'
import { UserUpdateBusiness } from 'src/use_cases/user/update'
import { UserDelateBusiness } from 'src/use_cases/user/delete'
import { RestoreUserBusiness } from 'src/use_cases/user/restore'
export class ControllerUser extends AController {
  /**
   * @openapi
   * /register:
   *  post:
   *    tags: [Users Endpoints]
   *    description: Register a new user
   *    requestBody:
   *    content:
   *      application/json:
   *        schema:
   *          $ref: '#/components/schemas/user'
   *    responses:
   *      200:
   *        description: User registered Successfully
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/registerResponse'
   *      500:
   *        $ref: '#/components/responses/500'
   */
  public static async register(req: IRequest, res: IResponse): Promise<void> {
    try {
      res
        .status(200)
        .send(
          await new UserCreateBusiness(new DBImplementationFactory()).register(
            req.body
          )
        )
        .end();
    } catch (error) {
      super.handleError(error as Error, res, 'ControllerUser.register');
    }
  }
  /**
   * @openapi
   * /users:
   *  post:
   *    tags: [Users Endpoints]
   *    description: Create a new user
   *    requestBody:
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#/components/schemas/user'
   *    responses:
   *      200:
   *        description: User created
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/userRecord'
   *      500:
   *        $ref: '#/components/responses/500'
   */
  public static async create(req: IRequest, res: IResponse): Promise<void> {
    try {
      res
        .status(200)
        .send(
          await new UserCreateBusiness(new DBImplementationFactory()).create(
            req.body
          )
        )
        .end();
    } catch (error) {
      super.handleError(error as Error, res, 'ControllerUser.create');
    }
  }
  /**
   * @openapi
   * /logIn:
   *  post:
   *    tags: [Users Endpoints]
   *    description: Log in
   *    requestBody:
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#/components/schemas/userSignIn'
   *    responses:
   *      200:
   *        description: Token Authenticated
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                token:
   *                  type: string
   *      500:
   *        $ref: '#/components/responses/500'
   */
  public static async logIn(req: IRequest, res: IResponse): Promise<void> {
    try {
      res
        .status(200)
        .send(
          await new LogInBusiness(new DBImplementationFactory()).logIn(
            req.body.email,
            req.body.password
          )
        )
        .end();
    } catch (error) {
      super.handleError(error as Error, res, 'ControllerUser.logIn');
    }
  }
  /**
   * @openapi
   * /users:
   *  get:
   *    tags: [Users Endpoints]
   *    description: Find all users
   *    responses:
   *      200:
   *        description: Get all users
   *        content:
   *          application/json:
   *            schema:
   *              type: array
   *              items:
   *                $ref: '#/components/schemas/user'
   *      500:
   *        $ref: '#/components/responses/500'
   */
  public static async getAll(req: IRequest, res: IResponse): Promise<void> {
    try {
      res
        .status(200)
        .send(
          await new UserFinderBusiness(new DBImplementationFactory()).find()
        )
        .end();
    } catch (error) {
      super.handleError(error as Error, res, 'ControllerUser.getAll');
    }
  }
  /**
   * @openapi
   * /me:
   *  get:
   *    tags: [Users Endpoints]
   *    description: Get me information
   *    responses:
   *      200:
   *        description: Get me information
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/getUserWithDateTimeResponse'
   *      500:
   *        $ref: '#/components/responses/500'
   */
  public static async getMe(req: IRequest, res: IResponse) {
    try {
      res
        .status(200)
        .send(
          await new UserFinderBusiness(new DBImplementationFactory()).findMe(
            req.userMetadata.id
          )
        )
        .end();
    } catch (error) {
      super.handleError(error as Error, res, 'ControllerUser.getMe');
    }
  }
  /**
   * @openapi
   * /users/{id}:
   *  put:
   *    tags: [Users Endpoints]
   *    description: Update user by ID
   *    requestBody:
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#/components/schemas/user'
   *    responses:
   *      200:
   *        description: User updated
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/userRecord'
   *      500:
   *        $ref: '#/components/responses/500'
   */
  public static async update(req: IRequest, res: IResponse) {
    try {
      res
        .status(200)
        .send(
          await new UserUpdateBusiness(new DBImplementationFactory()).update(
            Number(req.params.id),
            req.body
          )
        )
        .end();
    } catch (error) {
      super.handleError(error as Error, res, 'ControllerUser.update');
    }
  }
  /**
   * @openapi
   * /users/{id}:
   *  delete:
   *    tags: [Users Endpoints]
   *    description: Unable user by ID
   *    parameters:
   *     - name: id
   *       in: path
   *       required: true
   *       description: User ID
   *       type: integer
   *    responses:
   *      200:
   *        description: User Unable
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *      500:
   *        $ref: '#/components/responses/500'
   */
  public static async delete(req: IRequest, res: IResponse) {
    try {
      res
        .status(200)
        .send(
          await new UserDelateBusiness(new DBImplementationFactory()).delete(
            Number(req.params.id),
            {
              id: req.userMetadata.id,
              isAdmin: req.userMetadata.isAdmin,
            }
          )
        )
        .end();
    } catch (error) {
      super.handleError(error as Error, res, 'ControllerUser.delete');
    }
  }
  /**
   * @openapi
   * /users/{id}:
   *  patch:
   *    tags: [Users Endpoints]
   *    description: Restore user by ID
   *    parameters:
   *     - name: id
   *       in: path
   *       required: true
   *       description: User ID
   *       type: integer
   *    responses:
   *      200:
   *        description: User restored successfully
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *      500:
   *        $ref: '#/components/responses/500'
   */
  public static async restoreUser(req: IRequest, res: IResponse) {
    try {
      res
        .status(200)
        .send(
          await new RestoreUserBusiness(new DBImplementationFactory()).restore(
            Number(req.params.id),
            {
              id: req.userMetadata.id,
              isAdmin: req.userMetadata.isAdmin,
            }
          )
        )
        .end();
    } catch (error) {
      super.handleError(error as Error, res, 'ControllerUser.restoreUser');
    }
  }
}