import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import {Form, Button} from 'react-bootstrap'

import {getUserDetails} from '../actions/userActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'


const UserEditPage = ({match, history}) => {
  const userId = match.params.id

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  
  const dispatch = useDispatch()

  const userDetails = useSelector(state => state.userDetails)
  const {user, loading, error } = userDetails

  useEffect( () => {
    if (!user.name || user._id !== userId) {
      dispatch(getUserDetails(userId))
    } else {
      setName(user.name)
      setEmail(user.email)
      setIsAdmin(user.isAdmin)
    }
  }, [dispatch, userId, user])

  const submitHandler = (evt) => {
    evt.preventDefault()
  }

  return (
    <>
      <Link to='/admin/userlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
      <h1>Edit User</h1>
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
        {/* isadmin group */}
        <Form.Group controlId='isadmin'>
          <Form.Check 
            type='checkbox' 
            label='Is Admin'
            checked={isAdmin}
            onChange={(evt) => setIsAdmin(evt.target.checked)}
          ></Form.Check>
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

export default UserEditPage