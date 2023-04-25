import express from 'express'
import dotenv from 'dotenv'

import connectDB from './config/database.js'

import productRoutes from './routes/productRoutes.js'



dotenv.config()

connectDB()

const app = express()

app.get('/', (req, res) => {
  res.send('API is running run run...')
})

app.use('/api/products', productRoutes)

const PORT = process.env.PORT || 8080

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))