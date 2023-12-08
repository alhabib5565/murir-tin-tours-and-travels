import { ZodError } from 'zod'
import { TErrorResponseFormate, TIssue } from '../types/errorResponseType'

const handlerZodError = (err: ZodError): TErrorResponseFormate => {
    const issue: TIssue[] = err.issues.map((issue) => {
        return {
            path: issue.path[issue.path.length - 1],
            message: issue.message,
        }
    })

    return {
        statusCode: 400,
        message: 'Validation Error',
        issue,
    }
}

export default handlerZodError