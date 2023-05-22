import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import {Form, Button} from 'react-bootstrap'

import { listProductDetails, updateProduct } from '../actions/productActions'

import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'


const ProductEditPage = ({match, history}) => {
  const productId = match.params.id

  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)
  
  const dispatch = useDispatch()

  const productDetails = useSelector(state => state.productDetails)
  const {product, loading, error } = productDetails
  
  const productUpdate = useSelector(state => state.productUpdate)
  const {loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate
  
  const uploadFileHandler = async (evt) => {
    // Only accessing single file (first file in array) instead of allowing user to upload multiple files
    const file = evt.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`
        }
      }
      const {data} = await axios.post('/api/upload', formData, config)
      // Setting image as the "path"
      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  useEffect( () => {
    if (successUpdate) {
      dispatch({type: PRODUCT_UPDATE_RESET})
      history.push('/admin/productlist')
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId))
      } else {
        setName(product.name)
        setPrice(product.price)
        setImage(product.image)
        setBrand(product.brand)
        setCategory(product.category)
        setCountInStock(product.countInStock)
        setDescription(product.description)
      }
    }
  }, [dispatch, history, productId, product, successUpdate])

  const submitHandler = (evt) => {
    evt.preventDefault()
    // Update Product
    dispatch(updateProduct({
      _id: productId,
      name,
      price,
      image,
      brand,
      category,
      countInStock,
      description
    }))
  }

  return (
    <>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
      <h1>Edit Product</h1>
      {loadingUpdate && <Loader />}
      {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
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
            onChange={(evt) => setPrice(Number(evt.target.value))}
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
          <Form.Control
            type='file'
            onChange={uploadFileHandler}
          ></Form.Control>
          {uploading && <Loader />}
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

