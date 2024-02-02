import {NextFunction, Request, Response} from "express";

export function catchAsync
(fn: (req: Request, res: Response, next: NextFunction) => Promise<Response | NextFunction | void>){
    return async (req: Request, res: Response, next: NextFunction) => {
        await fn(req, res, next).catch(next);
    };
}