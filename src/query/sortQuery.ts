import { Query } from "mongoose";
import { TQueryObj } from "../types/TQueryObj";


export const sort = <T>(modelQuery: Query<T[], T>, query: TQueryObj) => {
    if (query.sortOrder && query.sortBy) {
        const sortOrder = query.sortOrder
        const sortBy = query.sortBy
        const sort = `${sortOrder === 'desc' ? "-" : ''}${sortBy}`
        modelQuery.sort(sort)
    }

    return modelQuery
}