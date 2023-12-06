/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express'
import { tourController } from '../controllers/tour.controller'

const router = express.Router()



router.post('/create-tour', tourController.createTour)
router.get('/', tourController.getAllTours)

router.get('/:id', tourController.getSingleTour)
router.patch('/:id', tourController.updateTour)
router.delete('/:id', tourController.deleteTour)
router.get('/:id/nextSchedule', tourController.nextSchedule)

export const tourRoutes = router