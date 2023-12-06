import { Request, Response } from "express"
import { userService } from "../service/user.service";


const createUser = async (req: Request, res: Response) => {
    try {
        const userData = req.body
        const result = await userService.createUserDB(userData)
        res.status(201).json({
            success: true,
            message: 'user create successfully',
            data: result
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        res.status(500).json({
            status: 'fail',
            message: error.message || 'Something went wrong',
        })
    }
}

const getAlluser = async (req: Request, res: Response) => {
    try {
        const result = await userService.getAllUsers()
        res.status(200).json({
            success: true,
            message: 'get all user data successfully',
            data: result
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong',
        })
    }
}

const getSingleUser = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const result = await userService.getSingleUser(id)
        res.status(200).json({
            success: true,
            message: 'get single user data successfully',
            data: result
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong',
        })
    }
}

const updateUser = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const userData = req.body
        const result = await userService.updateUser(id, userData)
        res.status(200).json({
            success: true,
            message: 'update successfully',
            data: result
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong',
        })
    }
}

const deleteUser = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        await userService.deleteUser(id)
        res.status(200).json({
            success: true,
            message: 'deleted successfully',
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong',
        })
    }
}

export const userController = {
    createUser,
    getAlluser,
    getSingleUser,
    updateUser,
    deleteUser
}