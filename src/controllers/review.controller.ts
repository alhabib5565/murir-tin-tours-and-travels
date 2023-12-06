import { Request, Response } from "express"
import { reviewServices } from "../service/review.service"


const createReview = async (req: Request, res: Response) => {
    try {
        const userData = req.body
        const result = await reviewServices.createReview(userData)
        res.status(201).json({
            success: true,
            message: 'review create successfully',
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

const getAllReviews = async (req: Request, res: Response) => {
    try {
        const result = await reviewServices.getAllReviews()
        res.status(200).json({
            success: true,
            message: 'get all review data successfully',
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

const getSingleReview = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const result = await reviewServices.getSingleReview(id)
        res.status(200).json({
            success: true,
            message: 'get single review data successfully',
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

const updateReview = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const userData = req.body
        const result = await reviewServices.updateReview(id, userData)
        res.status(200).json({
            success: true,
            message: 'update review successfully',
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

const deleteReview = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        await reviewServices.deleteReview(id)
        res.status(200).json({
            success: true,
            message: 'deleted review successfully',
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong',
        })
    }
}

export const reviewController = {
    createReview,
    getAllReviews,
    getSingleReview,
    updateReview,
    deleteReview
}