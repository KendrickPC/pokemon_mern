const express = require('express')
const products = require('./data/products')

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

app.listen(8080, console.log('Server running on port 8080'))