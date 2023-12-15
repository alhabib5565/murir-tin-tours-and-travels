

import { Request, Response } from "express"
import { tourServices } from "../service/tour.service"
import { catchAsyncFunction } from "../utils/catchAsync"
import { sendSuccessResponse } from "../utils/sendSuccessResponse"


const createTour = catchAsyncFunction(async (req: Request, res: Response) => {
    const userData = req.body
    const result = await tourServices.createTour(userData)
    sendSuccessResponse(res, {
        message: "tour create successfully",
        data: result
    })
})

const getAllTours = async (req: Request, res: Response) => {
    try {
        const result = await tourServices.getAllTours(req.query)
        res.status(200).json({
            success: true,
            message: 'get all tours data successfully',
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

const getSingleTour = catchAsyncFunction(async (req: Request, res: Response) => {
    const id = req.params.id
    const result = await tourServices.getSingleTour(id)
    sendSuccessResponse(res, {
        message: 'get single tour data successfully',
        data: result
    })
})

const updateTour = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const userData = req.body
        const result = await tourServices.updateTour(id, userData)
        res.status(200).json({
            success: true,
            message: 'update tour successfully',
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

const deleteTour = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        await tourServices.deleteTour(id)
        res.status(200).json({
            success: true,
            message: 'deleted tour successfully',
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong',
        })
    }
}
const nextSchedule = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const result = await tourServices.nextSchedule(id)
        res.status(200).json({
            success: true,
            message: 'next schedule successfully',
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

export const tourController = {
    createTour,
    getAllTours,
    getSingleTour,
    updateTour,
    deleteTour,
    nextSchedule
}