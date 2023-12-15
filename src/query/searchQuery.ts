import { FilterQuery, Query } from "mongoose";
import { TQueryObj } from "../types/TQueryObj";


export const search = <T>(modelQuery: Query<T[], T>, query: TQueryObj) => {
    if (query.searchTerm) {
        const searchableFields = Object.values(modelQuery.model.schema.paths)
            .filter(pathObj => pathObj.instance === "String")
            .map(pathObj => ({ [pathObj.path]: { $regex: query.searchTerm, $options: "i" } } as FilterQuery<T>))

        modelQuery.find({
            $or: searchableFields
        })
    }

    return modelQuery
}