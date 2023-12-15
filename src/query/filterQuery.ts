import { Query } from "mongoose"
import { TQueryObj } from "../types/TQueryObj"

export const filter = <T>(modelQuery: Query<T[], T>, query: TQueryObj) => {
    const excluideField = [
        "searchTerm",
        "page",
        "limit",
        "sortBy",
        "sortOrder"
    ]

    const queryObj = { ...query }
    excluideField.forEach(field => delete queryObj[field])

    // console.log('query', query)
    // console.log('queryObj', queryObj)

    modelQuery = modelQuery.find(queryObj)
    return modelQuery
}
