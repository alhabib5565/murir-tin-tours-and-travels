import { Request, Response } from "express"
import { reviewServices } from "../service/review.service"
import { catchAsyncFunction } from "../utils/catchAsync"
import { sendSuccessResponse } from "../utils/sendSuccessResponse"


const createReview = catchAsyncFunction(async (req: Request, res: Response) => {
    const userData = req.body
    const result = await reviewServices.createReview(userData)
    sendSuccessResponse(res, {
        statusCode: 201,
        message: 'give review successfully',
        data: result
    })
})

const getAllReviews = catchAsyncFunction(async (req: Request, res: Response) => {
    const result = await reviewServices.getAllReviews()
    sendSuccessResponse(res, {
        message: 'get all review data successfully',
        data: result
    })

})

const getSingleReview = catchAsyncFunction(async (req: Request, res: Response) => {
    const id = req.params.id
    const result = await reviewServices.getSingleReview(id)
    sendSuccessResponse(res, {
        message: 'get single review data successfully',
        data: result
    })
})

const updateReview = catchAsyncFunction(async (req: Request, res: Response) => {
    const id = req.params.id
    const userData = req.body
    const result = await reviewServices.updateReview(id, userData)
    sendSuccessResponse(res, {
        message: 'update review successfully',
        data: result
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
})

const deleteReview = catchAsyncFunction(async (req: Request, res: Response) => {
    const id = req.params.id
    await reviewServices.deleteReview(id)
    res.status(200).json({
        success: true,
        message: 'deleted review successfully',
    })

    sendSuccessResponse(res, {
        message: 'deleted review successfully',
        data: ''
    })

})

export const reviewController = {
    createReview,
    getAllReviews,
    getSingleReview,
    updateReview,
    deleteReview
}