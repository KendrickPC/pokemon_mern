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

 

  const dispatch = useDispatch()

  const userRegister = useSelector(state => state.userRegister)
  const {userInfo, loading, error } = userRegister

  const redirect = location.search ? 
  location.search.split('=')[1] : 
  '/'

  useEffect( () => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = (evt) => {
    evt.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(register(name, email, password))
    }
  }

  return (
    <FormContainer>
      <h1>SIGN UP</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
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
        {/* email group */}
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control 
            type='email' 
            placeholder='enter email'
            value={email}
            onChange={(evt) => setEmail(evt.target.value)}
          ></Form.Control>
        </Form.Group>
        {/* password group */}
        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type='password' 
            placeholder='enter password'
            value={password}
            onChange={(evt) => setPassword(evt.target.value)}
          ></Form.Control>
        </Form.Group>
        {/* CONFIRM password group */}
        <Form.Group controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control 
            type='password' 
            placeholder='CONFIRM password'
            value={confirmPassword}
            onChange={(evt) => setConfirmPassword(evt.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Register
        </Button>
      </Form>

      {/* Already registered? Redirect back to LOGIN */}
      <Row className='py-3'>
        <Col>
          <span>Have an Account Already?   </span>  
          <Link to={redirect ? 
            `/login?redirect=${redirect}` :
            '/login'}>
            Login
          </Link>
          

        </Col>

      </Row>
    </FormContainer>
  )
}

export default RegisterPage