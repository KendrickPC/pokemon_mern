import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import connectDB from './config/database.js'

import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

import { notFound, errorHandler } from './middleware/errorMiddleware.js'

dotenv.config()

connectDB()

const app = express()

// only running morgan in dev mode
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())

app.get('/', (req, res) => {
  return res.send('API is running run run...')
})

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

app.get('/api/config/paypal', (req, res) => 
  res.send(process.env.PAYPAL_CLIENT_ID)
)

// Making the "uploads" folder "static" in Express
// Defines the __dirname__ variable and assigns it the resolved absolute path of the current working directory, ensuring that it points to the correct directory even when the script is executed from a different location, and makes the "uploads" folder static in Express by serving its files as static files.
const __dirname__ = path.resolve()
// Sets up a static file middleware in Express to serve the files in the "uploads" folder as static files, making them accessible to clients by joining the __dirname__ variable with the "/uploads" path segment.
app.use('/uploads', express.static(path.join(__dirname__, '/uploads')))
// The above two lines allows files stored in the "uploads" folder to be accessed and downloaded through the /uploads URL path in the Express application.
// For example, if we have a file named "pikachu.jpg" in the "uploads" folder, it can be accessed at http://yourdomain.com/uploads/pikachu.jpg


app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 8080

app.listen(PORT, 
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)