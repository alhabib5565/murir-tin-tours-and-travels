import { Query, Schema, model } from "mongoose";
import { Iuser } from "../interface/user.interface";
import { USER_ROLE, USER_STATUS } from "../constant/user.constant";
import bcrypt from 'bcrypt';

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
    password: {
        type: String,
        required: [true, 'password is required'],
        select: 0
    },
    passwordChangeAt: {
        type: Date,
        default: null
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
            values: Object.keys(USER_ROLE),
            message: '{VALUE} is not supported',
            default: 'user'
        }
    },
    userStatus: {
        type: String,
        enum: {
            values: Object.keys(USER_STATUS),
            default: 'user'
        }
    }
})

userSchema.pre(/^find/, function (this: Query<Iuser, Document>, next) {
    this.find({ userStatus: { $ne: 'inactive' } })
    next()
})

userSchema.pre('save', async function (next) {
    const hashedPassword = await bcrypt.hash(this.password, 16)
    this.password = hashedPassword
    next()
})
// userSchema.pre('findOne', function (next) {
//     this.findOne({ userStatus: { $ne: 'inactive' } })
//     next()
// })

export const User = model<Iuser>('User', userSchema)
