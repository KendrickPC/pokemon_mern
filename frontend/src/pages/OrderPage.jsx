import React, {useEffect} from 'react';
import {
  Button,
  Row,
  Col,
  ListGroup,
  Image,
  Card
} from 'react-bootstrap'
import { Link } from 'react-router-dom/';

import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message'
import Loader from '../components/Loader'
import {getOrderDetails} from '../actions/orderActions'

const OrderPage = ({match}) => {
  const orderId = match.params.id
  const dispatch = useDispatch()
  const orderDetails = useSelector(state => state.orderDetails)
  const {order, loading, error} = orderDetails
  
  useEffect(() => {
    // Check for the order and also make sure that the order ID matches the ID in the URL. 
    // If it does not, then dispatch getOrderDetails() to fetch the most recent order
    if (!order || order._id !== orderId) {
      dispatch(getOrderDetails(orderId))
    }
  }, [order, orderId])

  return loading ? <Loader /> : error ? 
    <Message variant='danger'>{error}</Message> :
    <>
    <h1>Order {order._id}</h1>
    <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p><strong>Name: </strong> {order.user.name}</p>
              <p><strong>Email: </strong><a href={`mailto: ${order.user.email}`}>{order.user.email}</a></p>
              <p>
                <strong>Address:</strong>
                {order.shippingAddress.address}, 
                {order.shippingAddress.city}, 
                {order.shippingAddress.postalCode}, 
                {order.shippingAddress.country},
              </p>
              {order.isDelivered ? 
              <Message variant='succes'>Delivered on {order.deliveredAt}</Message> : 
              <Message variant='danger'>Not Delivered</Message>}
            </ListGroup.Item>
            
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? 
              <Message variant='succes'>Paid on {order.paidAt}</Message> : 
              <Message variant='danger'>Not Paid</Message>}
            </ListGroup.Item>
            
            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0  ? <Message>Order is empty</Message> : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image src={item.image} alt={item.name} fluid rounded />
                        </Col>
                        <Col>
                          <Link to={`/products/${item.product}`}>{item.name}</Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} X {item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>

                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>

          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>Order Summary</h3>  
            </ListGroup.Item>
            {/* Items Price */}
            <ListGroup.Item>
              <Row>
                <Col>Items</Col>
                <Col>${order.itemsPrice}</Col>
              </Row>
            </ListGroup.Item>
            {/* Shipping Price */}
            <ListGroup.Item>
              <Row>
                <Col>Shipping</Col>
                <Col>${order.shippingPrice}</Col>
              </Row>
            </ListGroup.Item>
            {/* Tax Price */}
            <ListGroup.Item>
              <Row>
                <Col>Tax</Col>
                <Col>${(order.taxPrice).toFixed(2)}</Col>
              </Row>
            </ListGroup.Item>
            {/* Total Price */}
            <ListGroup.Item>
              <Row>
                <Col>Total Price</Col>
                <Col>${order.totalPrice}</Col>
              </Row>
            </ListGroup.Item>

            {/* Adding PayPal button here later instead of button */}
            {/* Will also have a mark as delivered button for admins */}

          </ListGroup>
        </Col>
      </Row>
    </>

}

export default OrderPage
