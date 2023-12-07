/* eslint-disable @typescript-eslint/no-explicit-any */
// import mongoose from 'mongoose'
// import { IBooking } from '../interfaces/booking.interface'
import Booking from '../models/booking.model'
import { IBooking } from '../interface/booking.interface'
import { Tour } from '../models/tour.model'
import mongoose from 'mongoose'
// import Tour from '../models/tour.model'
// import GenericError from '../classes/errorClasses/GenericError'

// const createBookingWithoutTransaction = async (
//   bookingData: IBooking,
// ): Promise<IBooking> => {
//   const booking = await Booking.create(bookingData)

//   if (!booking) {
//     throw new Error('Booking failed')
//   }

//   //   throw new Error('Booking failed fake error')
//   const tour = await Tour.findByIdAndUpdate(
//     booking.tour,
//     // {
//     //   $inc: { availableSeats: -booking.bookedSlots },
//     // },
//     {
//       availableSeats: { $inc: -booking.bookedSlots },
//     },
//   )
//   if (!tour) {
//     throw new Error('Booking failed')
//   }

//   return booking
// }

//with transaction
///transaction makes a replica set / clone of the entire database
// it runs the database operations in a isolated environment
// if all operation is successful then it commits the transaction. means it keeps the clone databse to main database
// if any operation fails then it aborts the transaction. means it deletes the clone database
// const createBooking = async (bookingData: IBooking): Promise<IBooking> => {
//     //initiate the isolated environment. that is the mongodb session/ mongoose session
//     const session = await mongoose.startSession()
//     //session is the isolated environment

//     //start the database operation in isolated environment
//     session.startTransaction()

//     try {
//         //array of object sent
//         const booking = await Booking.create([bookingData], { session })

//         //so booking is an array of object with one object
//         if (!booking) {
//             // throw new Error('Booking failed')
//         }

//         // throw new Error('Booking failed fake error')
//         const tour = await Tour.findByIdAndUpdate(
//             booking[0].tour,
//             //   {
//             //     $inc: { availableSeats: -booking[0].bookedSlots },
//             //   },
//             {
//                 availableSeats: { $inc: -booking[0].bookedSlots },
//             },

//             {
//                 session,
//                 // new: true,
//                 // runValidators: true,
//             },
//         )
//         if (!tour) {
//             // throw new Error('Tour Update in booking failed')
//             throw new GenericError('Tour Update in booking failed', 400)
//         }

//         await session.commitTransaction()
//         //replica set / clone is saved to main database
//         await session.endSession()
//         //isolated environment is closed

//         return booking[0]
//     } catch (error: any) {
//         await session.abortTransaction()
//         await session.endSession()
//         // throw new Error(error)
//         throw new GenericError(error.message, 400)
//     }
// }

const createBooking = async (payload: IBooking) => {
    const session = await mongoose.startSession()

    try {
        session.startTransaction()

        const booking = await Booking.create([payload], { session })
        if (!booking) {
            throw new Error('booking create failed')
        }
        // throw new Error('custom error')
        const updateSeats = await Tour.findOneAndUpdate(
            { _id: booking[0].tourId },
            { $inc: { availableSeats: -booking[0].bookedSlots } },
            { session: session }
        )

        if (!updateSeats) {
            throw new Error('booking create failed')
        }

        await session.commitTransaction()
        await session.endSession()
        return booking
    } catch (error) {
        await session.abortTransaction()
        await session.endSession()
        throw new Error("tour booking failed")
    }
}

const getAllBookings = async (): Promise<IBooking[]> => {
    const result = await Booking.find()
    return result
}

const getSingleBooking = async (id: string): Promise<IBooking | null> => {
    const result = await Booking.findById(id)
    return result
}
const getAllBookingsOfAUser = async (id: string): Promise<IBooking[]> => {
    const result = await Booking.find({
        userId: id,
    })
    return result
}

//apply transaction here
//if bookedSlots decreases, then increase availableSeats in tour
//if bookedSlots increases, then decrease availableSeats in tour
// const bookingData Partial<IBooking>  = {}
const updateBookingSlot = async (id: string, payload: { bookedSlots: number }) => {
    const session = await mongoose.startSession()
    try {
        session.startTransaction()
        const updateBookingSlot = await Booking.findOneAndUpdate(
            { tourId: id },
            { $inc: { bookedSlots: payload.bookedSlots } },
            { session, new: true }
        )

        if (!updateBookingSlot) {
            throw new Error('booking slot update failed')
        }

        const updateAvailabeSeats = await Tour.findOneAndUpdate(
            { _id: id },
            { $inc: { availableSeats: -payload.bookedSlots } },
            { session, new: true }
        )
        if (!updateAvailabeSeats) {
            throw new Error('booking slot update failed')
        }

        await session.commitTransaction()
        await session.endSession()

        return updateBookingSlot
    } catch (error) {
        await session.abortTransaction()
        await session.endSession()
        throw new Error('booking slot update failed')
    }
}

const deleteBooking = async (id: string): Promise<IBooking | null> => {
    const result = await Booking.findByIdAndDelete(id)
    return result
}

export const bookingServices = {
    createBooking,
    getAllBookings,
    getSingleBooking,
    getAllBookingsOfAUser,
    updateBooking: updateBookingSlot,
    deleteBooking,
}