import { Model, Schema } from "mongoose"

type IReview = {
    review: string
    rating: number,
    createAT: Date,
    user: Schema.Types.ObjectId
    tour: Schema.Types.ObjectId
    createdAt: Date
}
export interface IReviewModel extends Model<IReview> {
    // eslint-disable-next-line no-unused-vars
    calcAverageRatings(tourId: Schema.Types.ObjectId): Promise<void>
}
export { IReview }