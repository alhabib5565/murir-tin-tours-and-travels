/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express"
import { TErrorResponseFormate } from "../types/errorResponseType"
import errorPreproccesor from "../errorHandler/errorPreProccesor"

export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {

    let errorResponseFomate: TErrorResponseFormate = {
        statusCode: 500,
        message: err.message || 'Something went wrong',
        issue: []
    }

    errorResponseFomate = errorPreproccesor(err)


    res.status(errorResponseFomate.statusCode).json({
        status: false,
        statusCode: errorResponseFomate.statusCode,
        message: errorResponseFomate.message,
        issue: errorResponseFomate.issue,
        err
    })
}