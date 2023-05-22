import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/database.js'

import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

import { notFound, errorHandler } from './middleware/errorMiddleware.js'

dotenv.config()

connectDB()

const app = express()

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
// Defines the __dirname__ variable and assigns it the value of the resolved absolute path of the current working directory. 
// The path.resolve() function resolves the absolute path of the directory in which the currently executing script resides. It ensures that __dirname__ points to the correct directory, even if the script is being run from a different location.
const __dirname__ = path.resolve()
// Sets up a static file middleware in Express. It tells Express to serve the files in the "uploads" folder as static files, making them accessible to clients.
// The express.static() function creates a middleware function that serves static files from the specified directory. 
// In this case, it serves files from the "uploads" directory. The path.join() function is used to join the __dirname__ variable with the "/uploads" path segment to form the complete path to the "uploads" folder.
app.use('/uploads', express.static(path.join(__dirname__, '/uploads')))
// By using the above two lines of code, any files stored in the "uploads" folder will be available for access and download through the /uploads URL path in our Express application. 
// For example, if we have a file named "pikachu.jpg" in the "uploads" folder, it can be accessed at http://yourdomain.com/uploads/pikachu.jpg


app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 8080

app.listen(PORT, 
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)