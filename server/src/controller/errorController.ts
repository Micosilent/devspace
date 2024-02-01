import {NextFunction, Request, Response} from "express";
import {AppError} from "../../util/AppError";

function sendDevError(res: Response, err: AppError){

    // During development, we want full error information
    return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        stack: err.stack,
        err
    })
}

function sendProdError(res: Response, err: AppError){
    if (err.isOperational){
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        })
    }

    // Non-operational errors may leak information about vulnerabilities
    console.log('ERROR', err);
    res.status(500).json({
        status: "Error",
        message: "Something went wrong on our side!"
    })
}

export async function errorHandler(
    err: AppError,
    _req: Request,
    res: Response,
    _next: NextFunction
    ){
    // Errors thrown by libraries
    if (err.name === 'JsonWebTokenError'){
        err = new AppError('Invalid token. Please log in again', 401);
    }
    if (err.name === 'TokenExpiredError'){
        err = new AppError('Your token has expired. Please log in again', 401);
    }

    // If we are in dev use sendDevError
    if (process.env.NODE_ENV === 'development'){
        sendDevError(res, err);
        return
    }

    sendProdError(res, err)
}
