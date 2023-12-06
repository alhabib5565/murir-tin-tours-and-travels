import mongoose from 'mongoose'

export interface IBooking {
    userId: mongoose.Schema.Types.ObjectId
    tourId: mongoose.Schema.Types.ObjectId
    bookedSlots: number
    price: number
    bookingStatus: 'pending' | 'paid' | 'cancelled'
}