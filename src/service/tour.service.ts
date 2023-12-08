import { ITour } from "../interface/tour.interface"
import { Tour } from "../models/tour.model"
import tourSchemaValidation from "../validation/tour.validation"


const createTour = async (tourData: ITour): Promise<ITour> => {
    const validatedData = tourSchemaValidation.parse(tourData)
    const result = await Tour.create(validatedData)

    return result
}

const getAllTours = async (): Promise<ITour[]> => {
    const result = await Tour.find()
    return result
}

const getSingleTour = async (id: string): Promise<ITour | null> => {
    const result = await Tour.findById(id).populate('review')
    return result
}

const updateTour = async (
    id: string,
    tourData: ITour,
): Promise<ITour | null> => {
    const result = await Tour.findByIdAndUpdate(id, tourData, {
        new: true,
        runValidators: true,
    })

    return result
}

const deleteTour = async (id: string): Promise<ITour | null> => {
    const result = await Tour.findByIdAndDelete(id)
    return result
}
const getNextSchedule = async (id: string) => {
    const tour = await Tour.findById(id)
    const nextSchedule = tour?.getNextNearestStartDateAndEndDate()
    return {
        tour,
        nextSchedule
    }
}


export const tourServices = {
    createTour,
    getAllTours,
    getSingleTour,
    updateTour,
    deleteTour,
    nextSchedule: getNextSchedule
}
