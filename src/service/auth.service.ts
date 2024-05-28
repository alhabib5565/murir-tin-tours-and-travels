import config from "../config";
import GenericError from "../genericError/genericError";
import { Iuser } from "../interface/user.interface";
import { User } from "../models/user.model";
import { passwordMatched } from "../utils/isPasswordMatched";
import { createToken } from "../utils/createToken";
import { JwtPayload, verify } from "jsonwebtoken";
import bcrypt from 'bcrypt'
import { sendMail } from "../utils/sendMail";
type TRegister = Omit<Iuser, 'role' | 'userStatus'>

const register = async (payload: TRegister) => {
    const userData = {
        ...payload,
        role: 'user',
        userStatus: 'active'
    }

    const result = await User.create(userData)
    return result
}

const loginUser = async (payload: { email: string, password: string }) => {
    const user = await User.findOne({ email: payload.email }).select('+password')

    if (!user) {
        throw new GenericError('User not found', 404)
    }

    const isPasswordMatched = await passwordMatched(payload.password, user.password)
    if (!isPasswordMatched) {
        throw new GenericError('Password does not match', 401)
    }

    const jwtPayload = {
        email: user.email,
        role: user.role
    }

    const accessToken = createToken(
        jwtPayload,
        config.jwt_access_secret,
        config.jwt_access_expiresIn
    )

    const refreshToken = createToken(
        jwtPayload,
        config.jwt_refresh_secret,
        config.jwt_refresh_expiresIn
    )

    return {
        accessToken,
        refreshToken
    }
}

const changePassword = async (decodedUser: JwtPayload, payload: { oldPassword: string, newPassword: string }) => {

    const user = await User.findOne({ email: decodedUser.email }).select('+password')
    if (!user) {
        throw new GenericError('User not found', 404)
    }

    const isPasswordMatched = await passwordMatched(payload.oldPassword, user.password)
    if (!isPasswordMatched) {
        throw new GenericError('Password does not match', 401)
    }

    const hashedPassword = await bcrypt.hash(payload.newPassword, 16)

    const result = await User.findOneAndUpdate(
        { email: user.email },
        {
            password: hashedPassword,
            passwordChangeAt: new Date()
        },
        { new: true }
    )

    return result
}

const refreshToken = async (token: string) => {
    const decodedUser = verify(token, config.jwt_refresh_secret) as JwtPayload

    const user = await User.findOne({ email: decodedUser.email })

    if (!user) {
        throw new GenericError('User not found', 404)
    }
    const jwtPayload = {
        email: user.email,
        role: user.role
    }

    const accessToken = createToken(
        jwtPayload,
        config.jwt_access_secret,
        config.jwt_access_expiresIn
    )

    return {
        accessToken
    }
}

const forgetPassword = async (payload: { email: string }) => {
    const user = await User.findOne({ email: payload.email })

    if (!user) {
        throw new GenericError('User not found', 404)
    }

    const jwtPayload = {
        email: user.email,
        role: user.role
    }

    const token = createToken(
        jwtPayload,
        config.jwt_access_secret,
        '10m'
    )

    const ressetLink = `https://localhost:5000/forgetPassword?token=${token}`

    sendMail(user.email, ressetLink)
    return null
}

const ressetPassword = async (token: string, payload: { email: string, newPassword: string }) => {

    const user = await User.findOne({ email: payload.email })

    if (!user) {
        throw new GenericError('User not found', 404)
    }

    const decodedUser = verify(token, config.jwt_access_secret) as JwtPayload

    console.log(decodedUser.email, user.email)

    if (decodedUser.email !== user.email) {
        throw new Error('forbidden acccess')
    }

    const hashedPassword = await bcrypt.hash(payload.newPassword, 16)

    const result = await User.findOneAndUpdate(
        { email: user.email },
        {
            password: hashedPassword,
            passwordChangeAt: new Date()
        },
        { new: true }
    )

    return result

}

export const AuthService = {
    register,
    loginUser,
    changePassword,
    refreshToken,
    forgetPassword,
    ressetPassword
}