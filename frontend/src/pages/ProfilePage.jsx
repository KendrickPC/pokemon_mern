import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import {Link} from 'react-router-dom'
import {Form, Button, Row, Col} from 'react-bootstrap'

import {getUserDetails} from '../actions/userActions'
import Message from '../components/Message'
import Loader from '../components/Loader'



const ProfilePage = ({location, history}) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userDetails = useSelector(state => state.userDetails)
  const {user, loading, error } = userDetails

  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin

  useEffect( () => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (!user.name) {
        dispatch(getUserDetails(`profile`))
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [dispatch, history, userInfo, user])

  const submitHandler = (evt) => {
    evt.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      // DISPATCH update profile
    }
  }

  return (
    <Row>
      <Col md={3}>
      <h2>User Profile</h2>
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
          Update
        </Button>
      </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
      </Col>
    </Row>
  )
}

export default ProfilePage