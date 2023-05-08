import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Form, Button} from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import {saveShippingAddress} from '../actions/cartActions'

const ShippingPage = ({history}) => {
  const cart = useSelector(state => state.cart)
  const {shippingAddress} = cart

  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  const [country, setCountry] = useState(shippingAddress.country)
  
  const dispatch = useDispatch()

  const submitHandler = (evt) => {
    evt.preventDefault()
    console.log('Submit Handler Clicked!')
    dispatch(saveShippingAddress({address, city, postalCode, country}))
    history.push('/payment')

  }

  return (
    <FormContainer>
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        {/* address group */}
        <Form.Group controlId='address'>
          <Form.Label>Address</Form.Label>
          <Form.Control 
            type='text'
            placeholder='enter address'
            value={address || ''}
            required
            onChange={(evt) => setAddress(evt.target.value)}
          ></Form.Control>
        </Form.Group>
        {/* city group */}
        <Form.Group controlId='city'>
          <Form.Label>City</Form.Label>
          <Form.Control 
            type='text'
            placeholder='enter city'
            value={city}
            required
            onChange={(evt) => setCity(evt.target.value)}
          ></Form.Control>
        </Form.Group>
        {/* postalCode group */}
        <Form.Group controlId='postalCode'>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control 
            type='text'
            placeholder='enter postal code'
            value={postalCode}
            required
            onChange={(evt) => setPostalCode(evt.target.value)}
          ></Form.Control>
        </Form.Group>
        {/* country group */}
        <Form.Group controlId='country'>
          <Form.Label>Country</Form.Label>
          <Form.Control 
            type='text'
            placeholder='enter country'
            value={country}
            required
            onChange={(evt) => setCountry(evt.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default ShippingPage