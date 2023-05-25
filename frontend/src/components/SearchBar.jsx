import React, {useState} from 'react'
import {Form, Button} from 'react-bootstrap'

const SearchBar = ({history}) => {
  const [keyword, setKeyWord] = useState('')

  const submitHandler = (evt) => {
    evt.preventDefault()
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push('/')
    }
  }

  return (
    <Form onSubmit={submitHandler} className='d-flex'>
      <Form.Control 
        className='mr-sm-2 ml-sm-5'
        type='text'
        name='q'
        onChange={evt => setKeyWord(evt.target.value)}
        placeholder='Search Products...'
      ></Form.Control>
      <Button
        className='p-2'
        type='submit'
        variant='outline-success'
        id='searchbar-button'
      >
        Search
      </Button>
    </Form>
  )
}

export default SearchBar
