/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express'
import cors from 'cors'
import notFound from './middleware/notFound'
import { globalErrorHandler } from './middleware/globalErrorHandler'
import { routes } from './routes'
import cookiePerser from 'cookie-parser';
const app = express()

app.use(express.json())

app.use(cors())
app.use(cookiePerser())
app.use('/api/v1/', routes)


app.get('/', (req, res) => {
  res.send('Hello World!')
})
// not found route
app.use(notFound)

// global error handler
app.use(globalErrorHandler)
export default app
