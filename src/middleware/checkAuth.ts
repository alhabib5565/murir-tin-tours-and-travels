import { NextFunction, Request, Response } from 'express'
import GenericError from '../genericError/genericError'
import { JwtPayload, verify } from 'jsonwebtoken'
import config from '../config'
import { User } from '../models/user.model'
import { USER_ROLE } from "../constant/user.constant"
import { catchAsyncFunction } from '../utils/catchAsync'

type TUserRole = keyof typeof USER_ROLE

export const checkAuth = (...roles: TUserRole[]) => {
    return catchAsyncFunction(async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization
        if (!token) {
            throw new GenericError('You are unathorized', 401)
        }

        const decoded = verify(token, config.jwt_access_secret) as JwtPayload

        const user = await User.findOne({ email: decoded.email })
        if (!user) {
            throw new GenericError('User not found', 404)
        }

        if (decoded.iat && user.passwordChangeAt && decoded.iat < user.passwordChangeAt.getMinutes() / 1000) {
            throw new GenericError('User not found', 404)
        }


        if (!roles.includes(user?.role)) {
            throw new Error('You are not authorized user')
        }

        req.user = decoded
        next()
    })
}