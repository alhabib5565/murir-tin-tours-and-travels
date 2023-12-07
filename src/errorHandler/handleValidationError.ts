import mongoose from "mongoose"
import { TErrorResponseFormate, TIssue } from "../types/errorResponseType"

const handleValidationErro = (err: mongoose.Error.ValidationError): TErrorResponseFormate => {
    const issue: TIssue[] = []
    Object.values(err.errors)
        .forEach((errorObj: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
            issue.push({
                path: errorObj.path,
                message: errorObj.message
            })
        })
    return {
        statusCode: 400,
        message: "validation error",
        issue: issue,
    }
}

export default handleValidationErro