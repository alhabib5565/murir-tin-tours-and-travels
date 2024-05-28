import express from 'express'
import { userController } from '../controllers/user.controller'
import { checkAuth } from '../middleware/checkAuth'


const router = express.Router()

router.post('/create-user', checkAuth('admin'), userController.createUser)
router.get('/', userController.getAlluser)
router.get('/:id', userController.getSingleUser)
router.patch('/:id', userController.updateUser)
router.delete('/:id', userController.deleteUser)

export const userRoute = router