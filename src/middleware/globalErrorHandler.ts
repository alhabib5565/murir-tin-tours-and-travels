/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express"
import mongoose from "mongoose"
import { TErrorResponseFormate } from "../types/errorResponseType"
import handleValidationErro from "../errorHandler/handleValidationError"
import handlerDuplicateError from "../errorHandler/handleDuplicateError"
import handleCastError from "../errorHandler/handleCastError"

export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {

    let errorResponseFomate: TErrorResponseFormate = {
        statusCode: 500,
        message: err.message || 'Something went wrong',
        issue: []
    }

    // console.log(err)
    if (err instanceof mongoose.Error.ValidationError) {
        errorResponseFomate = handleValidationErro(err)
    } else if (err.code && err.code === 11000) {
        errorResponseFomate = handlerDuplicateError(err)
    } else if (err instanceof mongoose.Error.CastError) {
        errorResponseFomate = handleCastError(err)
    }


    res.status(errorResponseFomate.statusCode).json({
        status: false,
        statusCode: errorResponseFomate.statusCode,
        message: errorResponseFomate.message,
        issue: errorResponseFomate.issue,
        err
    })
}