import { NextFunction, Request, RequestHandler, Response } from "express"
import { userService } from "../service/user.service";
import { sendSuccessResponse } from "../utils/sendSuccessResponse";



const cathcAsync = (asyncFN: RequestHandler) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(asyncFN(req, res, next)).catch(error => next(error))
    }
}

const createUser = cathcAsync(async (req: Request, res: Response) => {
    const userData = req.body
    // throw new Error('throw error')
    const result = await userService.createUserDB(userData)
    sendSuccessResponse(res, {
        statusCode: 201,
        message: 'user create successfully',
        data: result
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
})

const getAlluser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await userService.getAllUsers()
        sendSuccessResponse(res, {
            statusCode: 200,
            message: 'get allsssssss user data successfully',
            data: result
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        next(error)
    }
}

const getSingleUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        const result = await userService.getSingleUser(id)
        throw new Error('sdfdf')
        sendSuccessResponse(res, {
            statusCode: 200,
            message: 'get single user data successfully',
            data: result
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error) {
        next(error)
    }
}

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        const userData = req.body
        const result = await userService.updateUser(id, userData)
        sendSuccessResponse(res, {
            statusCode: 201,
            message: 'update user data successfully',
            data: result
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error) {
        next(error)
    }
}

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        await userService.deleteUser(id)
        sendSuccessResponse(res, {
            statusCode: 200,
            message: 'user create successfully',
            data: ''
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error) {
        next(error)
    }
}



export const userController = {
    createUser,
    getAlluser,
    getSingleUser,
    updateUser,
    deleteUser
}