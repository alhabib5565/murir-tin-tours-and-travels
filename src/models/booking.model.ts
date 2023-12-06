import { Schema, model } from 'mongoose'
import { IBooking } from '../interface/booking.interface'

const bookingSchema = new Schema<IBooking>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    tourId: {
        type: Schema.Types.ObjectId,
        ref: 'Tour',
    },
    bookedSlots: {
        type: Number,
        required: [true, 'A booking must have bookedSlots'],
    },
    bookingStatus: {
        type: String,
        enum: ['pending', 'paid', 'cancelled'],
        required: [true, 'A booking must have a bookingStatus'],
    },

    price: {
        type: Number,
        required: [true, 'A booking must have a price'],
    },
})

const Booking = model<IBooking>('Booking', bookingSchema)

export default Booking