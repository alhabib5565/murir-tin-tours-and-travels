/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import { userRoute } from './routes/user.routes'
import { tourRoutes } from './routes/tour.routes'
import { reviewRoutes } from './routes/review.routes'
import notFound from './middleware/notFound'
import { globalErrorHandler } from './middleware/globalErrorHandler'
import { routes } from './routes'
const app = express()
app.use(express.json())
app.use(cors())

app.use('/api/v1/', routes)


app.get('/', (req, res) => {
  res.send('Hello World!')
})
// not found route
app.use(notFound)

// global error handler
app.use(globalErrorHandler)
export default app
