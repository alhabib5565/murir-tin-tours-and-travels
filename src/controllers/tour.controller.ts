

import { Request, Response } from "express"
import { tourServices } from "../service/tour.service"


const createTour = async (req: Request, res: Response) => {
    try {
        const userData = req.body
        const result = await tourServices.createTour(userData)
        res.status(201).json({
            success: true,
            message: 'tour create successfully',
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

const getAllTours = async (req: Request, res: Response) => {
    try {
        const result = await tourServices.getAllTours()
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

const getSingleTour = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const result = await tourServices.getSingleTour(id)
        res.status(200).json({
            success: true,
            message: 'get single tour data successfully',
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