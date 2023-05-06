import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card
} from 'react-bootstrap'
import Message from '../components/Message'
import {addToCart} from '../actions/cartActions'

const CartPage = ({match, location, history }) => {
  const productId = match.params.id
  if 
  return (
    <div>CartPage</div>
  )
}

export default CartPage