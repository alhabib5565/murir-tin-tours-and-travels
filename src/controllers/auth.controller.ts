import { Request, Response } from "express";
import { catchAsyncFunction } from "../utils/catchAsync";
import { AuthService } from "../service/auth.service";
import { sendSuccessResponse } from "../utils/sendSuccessResponse";
import config from "../config";


const register = catchAsyncFunction(async (req: Request, res: Response) => {
    const result = await AuthService.register(req.body)

    sendSuccessResponse(res, {
        statusCode: 201,
        message: 'Resister succesfull',
        data: result
    })
})

const loginUser = catchAsyncFunction(async (req: Request, res: Response) => {
    const { accessToken, refreshToken } = await AuthService.loginUser(req.body)
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: config.NODE_ENV === 'production'
    })

    sendSuccessResponse(res, {
        statusCode: 201,
        message: 'User log in succesfull',
        data: accessToken
    })
})

const changePassword = catchAsyncFunction(async (req: Request, res: Response) => {
    const result = await AuthService.changePassword(req.user, req.body)

    sendSuccessResponse(res, {
        statusCode: 201,
        message: 'Password change succesfully',
        data: result
    })
})

const refreshToken = catchAsyncFunction(async (req: Request, res: Response) => {
    const result = await AuthService.refreshToken(req.cookies.refreshToken,)

    sendSuccessResponse(res, {
        statusCode: 201,
        message: 'Get token succsflly',
        data: result
    })
})
const forgetPassword = catchAsyncFunction(async (req: Request, res: Response) => {
    const result = await AuthService.forgetPassword(req.body)

    sendSuccessResponse(res, {
        statusCode: 201,
        message: 'Get token succsflly',
        data: result
    })
})
const ressetPassword = catchAsyncFunction(async (req: Request, res: Response) => {
    const token = req.headers.authorization
    if (!token) {
        throw new Error('Forbbiden access')
    }
    const result = await AuthService.ressetPassword(token, req.body)

    sendSuccessResponse(res, {
        statusCode: 201,
        message: 'password resset succsfully',
        data: result
    })
})

export const AuthCotroller = {
    register,
    loginUser,
    changePassword,
    refreshToken,
    forgetPassword,
    ressetPassword
}