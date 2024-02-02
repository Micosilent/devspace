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

    public handleLogin = catchAsync(async (req, res, next) => {
        const {email, password, longExpiration} = req.body
        if (!email || !password) {
            return next(new AppError('Please provide email and password', 400))
        }

        const user = await this.userRepository.findOne({where: {email}})
        if (!user || !(await user.comparePassword(password))) {
            return next(new AppError('Incorrect email or password', 401))
        }

        // If everything is ok, send token to client
        this.sendToken(user, res, {long: longExpiration})
    })

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
        const candidateUser = await this.userRepository.findOne({where: {id: decoded.id}})
        if(!candidateUser){
            return next(new AppError('The user belonging to this token no longer exists', 401))
        }

        // Inject the user into the request and call the next middleware
        req.user = candidateUser;
        next()
    })

}


