import mongoose from 'mongoose'
import { TErrorResponseFormate, TIssue } from '../types/errorResponseType'
// import { TErrorIssue, TErrorResponse } from '../../types/TErrorResponse'

const handlerDuplicateError = (
    err: mongoose.Error.ValidationError,
): TErrorResponseFormate => {
    const regex = /"(.*?)"/
    const matches = err.message.match(regex)
    const issue: TIssue[] = [
        {
            path: '',
            message: `Duplicate value for ${matches![1]}`,
        },
    ]

    return {
        statusCode: 409,
        message: 'Duplicate Error',
        issue,
    }
}

export default handlerDuplicateError