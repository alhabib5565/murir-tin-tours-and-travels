import express from 'express'
import cors from 'cors'
import { userRoute } from './routes/user.routes'
import { tourRoutes } from './routes/tour.routes'
import { reviewRoutes } from './routes/review.routes'
const app = express()
app.use(express.json())
app.use(cors())

app.use('/api/v1/user', userRoute)
app.use('/api/v1/tour', tourRoutes)
app.use('/api/v1/review', reviewRoutes)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

export default app
