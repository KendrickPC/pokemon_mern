import React from 'react'
import {Link} from 'react-router-dom'
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button
} from 'react-bootstrap'
import Rating from '../components/Rating'
import products from '../products'

const ProductPage = ({match}) => {
  const product = products.find(item => item._id === match.params.id)
  
  return (
    <>
      <Link className='btn btn-light my-3' to='/'>Go Back</Link>
      <Row className='justify-content-center'>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid/>
        </Col>
        <Col md={3}>
          <ListGroup>
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating value={product.rating} text={`${product.numReviews} reviews`} />
            </ListGroup.Item>
            <ListGroup.Item>
              Price: ${product.price}
            </ListGroup.Item>
            <ListGroup.Item>
              Description: {product.description}
            </ListGroup.Item>
            {/* <ListGroup.Item></ListGroup.Item>
            <ListGroup.Item></ListGroup.Item> */}
          </ListGroup>
        </Col>
        {/* Col md={3} */}
        <Col md={3}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col>
                    Price: 
                  </Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    Status: 
                  </Col>
                  <Col>
                    {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button className='btn-block w-100' type='button'>
                  Add To Cart
                </Button>  
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
        <Col md={1}>

        </Col>

      </Row>
    </>
    
  )
}

export default ProductPage