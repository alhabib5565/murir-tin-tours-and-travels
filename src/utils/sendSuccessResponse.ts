import { Response } from "express"

type TSendSuccessResponse<T> = {
    statusCode?: number,
    message: string,
    data: T
}

export const sendSuccessResponse = <T>(res: Response, responseData: TSendSuccessResponse<T>) => {
    res.status(responseData?.statusCode || 200).json({
        success: true,
        message: responseData.message,
        data: responseData.data
    })
}