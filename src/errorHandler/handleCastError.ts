import mongoose from "mongoose";
import { TErrorResponseFormate, TIssue } from "../types/errorResponseType";

const handleCastError = (err: mongoose.Error.CastError): TErrorResponseFormate => {
    const issue: TIssue[] = []
    issue.push({
        path: err.path,
        message: err.message
    })
    return {
        message: 'Invalid Id',
        statusCode: 400,
        issue
    }
}

export default handleCastError