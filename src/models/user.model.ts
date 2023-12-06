import { Query, Schema, model } from "mongoose";
import { Iuser } from "../interface/user.interface";


const userSchema = new Schema<Iuser>({
    name: {
        type: String,
        required: [true, 'name is required'],
        maxlength: 20
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true,
        lowercase: true
    },
    age: {
        type: Number,
        required: [true, 'age required']
    },
    userPhoto: {
        type: String
    },
    role: {
        type: String,
        enum: {
            values: ['user', 'admin'],
            message: '{VALUE} is not supported',
            default: 'user'
        }
    },
    userStatus: {
        type: String,
        enum: {
            values: ['active', 'inactive']
        }
    }
})

userSchema.pre(/^find/, function (this: Query<Iuser, Document>, next) {
    this.find({ userStatus: { $ne: 'inactive' } })
    next()
})
// userSchema.pre('findOne', function (next) {
//     this.findOne({ userStatus: { $ne: 'inactive' } })
//     next()
// })

export const User = model<Iuser>('User', userSchema)
