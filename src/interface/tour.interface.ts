import { Model } from "mongoose"

type ITour = {
    name: string,
    durationHours: number
    ratingAverage: number
    ratingQuantity: number
    imageCover: string
    images: string[]
    createAT: Date
    startDates: Date[]
    startLocation: string
    locations: string[]
    slug: string,
    price: number
    createdAt: Date,
    availableSeats: number
}

interface ITourMethods {
    getNextNearestStartDateAndEndDate(): {
        nearestStartDate: Date | null
        estimatedEndDate: Date | null
    }
}

type TourModel = Model<ITour, Record<string, never>, ITourMethods>;


export { ITour, ITourMethods, TourModel }