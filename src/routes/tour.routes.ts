/* eslint-disable @typescript-eslint/no-explicit-any */
import { tourController } from '../controllers/tour.controller'
import tourSchemaValidation from '../validation/tour.validation'
import { validateBodyData } from '../middleware/validateRequestBodyData'
import express from 'express'
const router = express.Router()


router.post('/create-tour', validateBodyData(tourSchemaValidation), tourController.createTour)
router.get('/', tourController.getAllTours)

router.get('/:id', tourController.getSingleTour)
router.patch('/:id', tourController.updateTour)
router.delete('/:id', tourController.deleteTour)
router.get('/:id/nextSchedule', tourController.nextSchedule)

export const tourRoutes = router