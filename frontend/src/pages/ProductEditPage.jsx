import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import {Form, Button} from 'react-bootstrap'

import { listProductDetails } from '../actions/productActions'

import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'


const ProductEditPage = ({match, history}) => {
  const productId = match.params.id

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')
  
  const dispatch = useDispatch()

  const productDetails = useSelector(state => state.productDetails)
  const {product, loading, error } = productDetails
  
  useEffect( () => {
    if (!product.name || product._id !== productId) {
      dispatch(listProductDetails(productId))
    } else {
      setName(product.name)
      setPrice(product.email)
      setImage(product.image)
      setBrand(product.brand)
      setCategory(product.category)
      setCountInStock(product.countInStock)
      setDescription(product.description)
    }
  }, [dispatch, history, productId, product])

  const submitHandler = (evt) => {
    evt.preventDefault()
    // Update Product
  }

  return (
    <>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
      <h1>Edit Product</h1>

      {/* {loadingUpdate && <Loader />}
      {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>} */}

      {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
        <Form onSubmit={submitHandler}>
        {/* name group */}
        <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control 
            type='name' 
            placeholder='enter name'
            value={name}
            onChange={(evt) => setName(evt.target.value)}
          ></Form.Control>
        </Form.Group>
        {/* price group */}
        <Form.Group controlId='price'>
          <Form.Label>Price</Form.Label>
          <Form.Control 
            type='number'
            placeholder='enter price'
            value={price}
            onChange={(evt) => setPrice(evt.target.value)}
          ></Form.Control>
        </Form.Group>
        {/* image group */}
        <Form.Group controlId='image'>
        <Form.Label>Image</Form.Label>
          <Form.Control 
            type='text' 
            placeholder='enter image url'
            value={image}
            onChange={(evt) => setImage(evt.target.value)}
          ></Form.Control>
        </Form.Group>
        {/* brand group */}
        <Form.Group controlId='brand'>
        <Form.Label>Brand</Form.Label>
          <Form.Control 
            type='text' 
            placeholder='enter brand'
            value={brand}
            onChange={(evt) => setBrand(evt.target.value)}
          ></Form.Control>
        </Form.Group>
        {/* category group */}
        <Form.Group controlId='category'>
        <Form.Label>Category</Form.Label>
          <Form.Control 
            type='text' 
            placeholder='enter category'
            value={category}
            onChange={(evt) => setCategory(evt.target.value)}
          ></Form.Control>
        </Form.Group>
        {/* countInStock group */}
        <Form.Group controlId='countinstock'>
          <Form.Label>Count In Stock</Form.Label>
          <Form.Control 
            type='number'
            placeholder='enter count in stock'
            value={countInStock}
            onChange={(evt) => setCountInStock(evt.target.value)}
          ></Form.Control>
        </Form.Group>
        {/* description group */}
        <Form.Group controlId='description'>
        <Form.Label>Description</Form.Label>
          <Form.Control
            type='text' 
            placeholder='enter description'
            value={description}
            onChange={(evt) => setDescription(evt.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Update
        </Button>
        </Form>
      )}
      </FormContainer>
    </>
  )
}

export default ProductEditPage

