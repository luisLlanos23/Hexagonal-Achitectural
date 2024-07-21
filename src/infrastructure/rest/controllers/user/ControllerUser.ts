import { Request as IRequest, Response as IResponse } from 'express'
import { AController } from 'src/infrastructure/rest/AController'
import { DBImplementationFactory } from 'src/infrastructure/db/implementations/DBImplementationFactory'
import { UserCreateBusiness } from 'src/use_cases/user/create'
import { UserFinderBusiness } from 'src/use_cases/user/find'

export class ControllerUser extends AController {
  /**
   * @openapi
   * /user:
   *  post:
   *    tags: [User Endpoints]
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
  public static async create(req: IRequest, res: IResponse) {
    try {
      res.status(200).send(
        await new UserCreateBusiness(new DBImplementationFactory()).create(req.body)
      ).end()
    } catch (error) {
      super.handleError(error as Error, res, 'ControllerUser.create')
    }
  }
  /**
   * @openapi
   * /user:
   *  get:
   *    tags: [User Endpoints]
   *    description: Find all users
   *    responses:
   *      200:
   *        description: Get all users
   *        content:
   *          application/json:
   *            schema:
   *              type: array
   *              items:
   *                $ref: '#/components/schemas/userRecord'
   *      500:
   *        $ref: '#/components/responses/500'
  */
  public static async getAll(req: IRequest, res: IResponse) {
    try {
      res.status(200).send(
        await new UserFinderBusiness(new DBImplementationFactory()).find()
      ).end()
    } catch (error) {
      super.handleError(error as Error, res, 'ControllerUser.getAll')
    }
  }
  /**
   * @openapi
   * /logIn:
   *  post:
   *    tags: [User Endpoints]
   *    description: Log in
   *    requestBody:
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#/components/schemas/logIn'
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
  public static async logIn(req: IRequest, res: IResponse) {
    try {
      res.status(200).send().end()
    } catch (error) {
      super.handleError(error as Error, res, 'ControllerUser.logIn')
    }
  }
  /**
   * @openapi
   * /user/{id}:
   *  get:
   *    tags: [User Endpoints]
   *    description: Find user by ID
   *    responses:
   *      200:
   *        description: Get user by ID
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/userRecord'
   *      500:
   *        $ref: '#/components/responses/500'
  */
  public static async get(req: IRequest, res: IResponse) {
    try {
      res.status(200).send(
        await new UserFinderBusiness(new DBImplementationFactory()).findById(Number(req.params.id))
      ).end()
    } catch (error) {
      super.handleError(error as Error, res, 'ControllerUser.get')
    }
  }
  /**
   * @openapi
   * /user/{id}:
   *  put:
   *    tags: [User Endpoints]
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
      res.status(200).send().end()
    } catch (error) {
      super.handleError(error as Error, res, 'ControllerUser.update')
    }
  }
  /**
   * @openapi
   * /user/{id}:
   *  delete:
   *    tags: [User Endpoints]
   *    description: Unable user by ID
   *    responses:
   *      200:
   *        description: User Unable
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/userRecord'
   *      500:
   *        $ref: '#/components/responses/500'
  */
  public static async delete(req: IRequest, res: IResponse) {
    try {
      res.status(200).send().end()
    } catch (error) {
      super.handleError(error as Error, res, 'ControllerUser.delete')
    }
  }
}