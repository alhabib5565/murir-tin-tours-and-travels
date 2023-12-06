import { NextFunction, Request, RequestHandler, Response } from "express"


export const catchAsyncFunction = (asyncFN: RequestHandler) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(asyncFN(req, res, next)).catch(error => next(error))
    }
}