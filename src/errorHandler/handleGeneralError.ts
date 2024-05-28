import GenericError from "../genericError/genericError";
import { TErrorResponseFormate } from "../types/errorResponseType";


const handleGennericError = (err: GenericError): TErrorResponseFormate => {
    return {
        statusCode: err.statusCode,
        message: err.message || 'unknown error',
        issue: [
            {
                path: "",
                message: err.message
            }
        ],
    }
}

export default handleGennericError