import {Response} from "express";
import * as jwt from "jsonwebtoken";
import {User} from "../entity/User";
import {catchAsync} from "../util/catchAsync";
import {AppError} from "../util/AppError";
import {AppDataSource} from "../data-source";
import {JwtPayload} from "jsonwebtoken";
import {AppRequest} from "../util/AppRequest";



export class AuthController {
    private readonly jwt_secret = process.env.JWT_SECRET

    private userRepository = AppDataSource.getRepository(User)

    private getJWT(user: User, expiresIn: string) {
        return jwt.sign({
            id: user.id,
        }, this.jwt_secret, {expiresIn})
    }

    private sendToken(user: User, res: Response, extraOptions?: { long: boolean }) {
        const expirationDelta = extraOptions?.long ? "30d" : "1d"
        const expirationInMillis = expirationDelta === "30d" ? 30 * 24 * 60 * 60 * 1000 :  60 * 60 * 1000
        const token = this.getJWT(user, expirationDelta)

        res.cookie('jwt', token, {
            expires: new Date(Date.now() + expirationInMillis),
            secure: process.env.NODE_ENV !== 'development',
            httpOnly: true
        })

        res.status(200).send({
            status: 'success',
            token
        })

    }

  /**
   * @swagger
   * /auth/signup:
   *  post:
   *    tags:
   *      - Authentication
   *    summary: Sign up a new user
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            properties:
   *              email:
   *                type: string
   *                description: The email of the user
   *              password:
   *                type: string
   *                description: The password of the user
   *              passwordValidation:
   *                type: string
   *                description: Password validation field
   *              firstName:
   *                type: string
   *                description: The first name of the user
   *              lastName:
   *                type: string
   *                description: The last name of the user
   *    responses:
   *      200:
   *        description: Successfully signed up the user
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/User'
   *      400:
   *        description: Invalid input or user already exists
   */
  public handleSignUp = catchAsync(async (req, res, next) => {
    const {email, password, passwordValidation, firstName, lastName} = req.body
    // Body Validation

        if (password != passwordValidation) {
            return next(new AppError('Passwords do not match', 400))
        }
        if (!email || !password || !firstName || !lastName) {
            return next(new AppError('Please provide all required fields', 400))
        }

        //Check if user already exists
        if (await this.userRepository.findOne({where: {email}})) {
            return next(new AppError('User already exists', 400))
        }


        const newUser = Object.assign(new User(), {
            email,
            firstName,
            lastName,
            password: await User.hashPassword(password)
        })
        this.sendToken(await this.userRepository.save(newUser), res)
    })

  /**
   * @swagger
   * /auth/login:
   *  post:
   *    tags:
   *      - Authentication
   *    summary: Log in a user
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            properties:
   *              email:
   *                type: string
   *                description: The email of the user
   *              password:
   *                type: string
   *                description: The password of the user
   *              longExpiration:
   *                type: boolean
   *                description: Whether to keep the user logged in for a long time
   *    responses:
   *      200:
   *        description: Successfully logged in the user
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                status:
   *                  type: string
   *                  example: "success"
   *                token:
   *                  type: string
   *                  description: The JWT token for the user
   *      400:
   *        description: Missing email or password
   *      401:
   *        description: Incorrect email or password
   */
  public handleLogin = catchAsync(async (req, res, next) => {
    const { email, password, longExpiration } = req.body;
    if (!email || !password) {
      return next(new AppError("Please provide email and password", 400));
    }

        const user = await this.userRepository.findOne({where: {email}})
        if (!user || !(await user.comparePassword(password))) {
            return next(new AppError('Incorrect email or password', 401))
        }

        // If everything is ok, send token to client
        this.sendToken(user, res, {long: longExpiration})
    })

    /**
     * @swagger
     * /auth/logout:
     *  get:
     *    security:
     *      - bearerAuth: []
     *    tags:
     *      - Authentication
     *    summary: Log out the user
     *    responses:
     *      200:
     *        description: Successfully logged out the user
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                status:
     *                  type: string
     *                  example: "success"
     */
  public handleLogout = catchAsync(async (req: AppRequest, res, next) => {
    // Set the jwt cookie to a dummy value and set the expiration to a date in the past
    res.cookie("jwt", "loggedout", {
      expires: new Date(Date.now() - 10000),
      httpOnly: true,
    });
    res.status(200).json({ status: "success" });
  });

    public protect = catchAsync(async (req: AppRequest, res, next) => {
        let token: string | undefined;

        // Check if the request has a token
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1]
        } else if (req.cookies.jwt){
            token = req.cookies.jwt
        }

        // If there is no token, return an error
        if (!token){
            return next(new AppError('You are not logged in', 401))
        }

        // Verify the token
        const decoded = jwt.verify(token, this.jwt_secret) as JwtPayload
        // Check if the user still exists
        const candidateUser = await this.userRepository.findOne({
            where: {id: decoded.id},
            relations: {followed: true, followers: true, notifications: true}
        })
        if(!candidateUser){
            return next(new AppError('The user belonging to this token no longer exists', 401))
        }

        // Inject the user into the request and call the next middleware
        req.user = candidateUser;
        next()
    })

}


