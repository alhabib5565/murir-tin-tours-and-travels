/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose"
import handleValidationErro from "./handleValidationError"
import handlerDuplicateError from "./handleDuplicateError"
import handleCastError from "./handleCastError"
import handleGennericError from "./handleGeneralError"
import GenericError from "../genericError/genericError"
import { TErrorResponseFormate } from "../types/errorResponseType"

const errorPreproccesor = (err: any): TErrorResponseFormate => {
    // console.log(err)
    if (err instanceof mongoose.Error.ValidationError) {
        return handleValidationErro(err)
    } else if (err.code && err.code === 11000) {
        return handlerDuplicateError(err)
    } else if (err instanceof mongoose.Error.CastError) {
        return handleCastError(err)
    } else if (err instanceof GenericError) {
        return handleGennericError(err)
    } else {
        return {
            statusCode: 500,
            message: err.message || 'Something went wrong',
            issue: []
        }
    }
}

export default errorPreproccesor