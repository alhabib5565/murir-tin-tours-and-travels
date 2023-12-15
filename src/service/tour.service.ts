import { ITour } from "../interface/tour.interface"
import { Tour } from "../models/tour.model"
import { TQueryObj } from "../types/TQueryObj"
import { filter } from "../query/filterQuery"
import { search } from "../query/searchQuery"
import { sort } from "../query/sortQuery"


const createTour = async (tourData: ITour): Promise<ITour> => {
    const result = await Tour.create(tourData)

    return result
}

const getAllTours = async (query: TQueryObj): Promise<ITour[]> => {

    const filterQuery = filter(Tour.find(), query)
    const serachQuery = search(filterQuery, query)
    const sortQuery = sort(serachQuery, query)

    const result = await sortQuery;
    return result;

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
