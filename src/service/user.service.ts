import { Iuser } from "../interface/user.interface";
import { User } from "../models/user.model";


const createUserDB = async (userData: Iuser) => {
    const result = await User.create(userData)
    return result
}

const getAllUsers = async (): Promise<Iuser[]> => {
    const result = await User.find()
    return result
}

const getSingleUser = async (id: string): Promise<Iuser | null> => {
    const result = await User.findById(id)
    return result
}

const updateUser = async (id: string, userData: Iuser): Promise<Iuser | null> => {
    const result = await User.findByIdAndUpdate(id, userData, {
        new: true,
        runValidators: true
    })
    return result
}

const deleteUser = async (id: string): Promise<Iuser | null> => {
    const result = await User.findByIdAndDelete(id)
    return result
}

export const userService = {
    createUserDB,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser
}