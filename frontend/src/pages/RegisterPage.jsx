import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import {Form, Button, Row, Col} from 'react-bootstrap'

import {register} from '../actions/userActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'


const RegisterPage = ({location, history}) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const redirect = location.search ? 
      location.search.split('=')[1] : 
      '/'

  const dispatch = useDispatch()

  const userRegister = useSelector(state => state.userRegister)
  const {userInfo, loading, error } = userRegister



  useEffect( () => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = (evt) => {
    evt.preventDefault()
    // dispatch(login(email, password))
    // DISPATCH REGISTER
  }

  return (
    <FormContainer>
      <h1>SIGN UP</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        {/* name group */}
        <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control 
            type='name' 
            placeholder='enter name'
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        {/* email group */}
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control 
            type='email' 
            placeholder='enter email'
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        {/* password group */}
        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type='password' 
            placeholder='enter password'
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        {/* CONFIRM password group */}
        <Form.Group controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control 
            type='confirmPassword' 
            placeholder='CONFIRM password'
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>Signing IN</Button>
      </Form>

      <Row className='py-3'>
        <Col>
          <span>New Customer?   </span>  
          <Link to={redirect ? 
            `/register?redirect=${redirect}` :
            '/register'}>
            Register
          </Link>
          

        </Col>

      </Row>
    </FormContainer>
  )
}

export default RegisterPage