

import { Schema, model, } from 'mongoose'
import { ITour, ITourMethods, TourModel } from '../interface/tour.interface'

const tourSchema = new Schema<ITour, TourModel, ITourMethods>({
    name: {
        type: String,
        required: [true, 'Please tell us your name'],
    },
    durationHours: {
        type: Number,
        required: [true, 'Please tell us your durationHours'],
    },
    ratingAverage: {
        type: Number,
        default: 4.5,
    },
    ratingQuantity: {
        type: Number,
        default: 0,
    },
    price: {
        type: Number,
        required: [true, 'Please tell us your price'],
    },
    imageCover: {
        type: String,
        required: [true, 'Please tell us your imageCover'],
    },
    images: [String],
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    startDates: [Date],
    startLocation: {
        type: String,
        required: [true, 'Please tell us your startLocation'],
    },
    availableSeats: {
        type: Number,
        required: [true, 'Please tell us your availableSeats'],
    },
    locations: [String],
    slug: String,
}
    , {
        toJSON: { virtuals: true }
    }
)


tourSchema.virtual('durationDays').get(function () {
    return this.durationHours / 24
})

tourSchema.virtual('review', {
    ref: 'Review',
    foreignField: 'tour',
    localField: '_id'
})

tourSchema.methods.getNextNearestStartDateAndEndDate = function (): {
    nearestStartDate: Date | null
    estimatedEndDate: Date | null
} {
    const today = new Date()
    const futureDate = this.startDates.filter(date => date > today)
    futureDate.sort((a: Date, b: Date) => a.getTime() - b.getTime())
    const nearestStartDate = futureDate[0]
    const estimatedEndDate = new Date(
        nearestStartDate.getTime() + 60 * 60 * 1000
    )

    return {
        nearestStartDate,
        estimatedEndDate
    }
}




export const Tour = model<ITour, TourModel>("Tour", tourSchema)