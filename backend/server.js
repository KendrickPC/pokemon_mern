// const express = require('express')
import express from 'express'
// const dotenv = require('dotenv')
import dotenv from 'dotenv'

import connectDB from './config/database.js'

// const products = require('./data/products')
import products from './data/products.js'

dotenv.config()

connectDB()

const app = express()

app.get('/', (req, res) => {
  res.send('API is running run run...')
})
app.get('/api/products', (req, res) => {
  // res.send('API is running run run...')
  res.json(products)
})
app.get('/api/products/:id', (req, res) => {
  const product = products.find( (item) => item._id === req.params.id)
  res.json(product)
  
})

const PORT = process.env.PORT || 8080

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))