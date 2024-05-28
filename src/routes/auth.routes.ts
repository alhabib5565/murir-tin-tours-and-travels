import express from 'express'
import { AuthCotroller } from '../controllers/auth.controller'
import { checkAuth } from '../middleware/checkAuth'

const router = express.Router()

router.post('/register', AuthCotroller.register)
router.post('/login', AuthCotroller.loginUser)
router.post('/change-password', checkAuth('admin', 'user'), AuthCotroller.changePassword)
router.post('/forget-password', AuthCotroller.forgetPassword)
router.post('/resset-password', AuthCotroller.ressetPassword)
router.post('/refresh-token', AuthCotroller.refreshToken)

export const authRoutes = router