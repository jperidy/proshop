import React from 'react'
import { Link } from 'react-router-dom'
import { Col, Row, Image, ListGroup, Card, Button } from 'react-bootstrap'
import Rating from '../components/Rating'
import products from '../products'

const ProductScreen = ( {match} ) => {
    const product = products.find( (p) => p._id === match.params.id);
    return (
        <>
            <Link className='btn btn-light my-3' to='/'>Go Back</Link>
            <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid />
                </Col>
                <Col md={3}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating value={product.rating} text={`${product.numReviews} reviews`} /> 
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Price: {product.price}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Description: {product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col  md={3}>
                    <Card className='my-3 p-3 rounded'>
                        <ListGroup variant='flush'>
                            <Row>
                                <Col>Price:</Col>
                                <Col>
                                    <strong>${product.price}</strong>
                                </Col>
                            </Row>
                        </ListGroup>

                        <ListGroup variant='flush'>
                            <Row>
                                <Col>Status:</Col>
                                <Col>
                                    {product.countInStock > 0 ? 'In Stock' : "Out Of Stock"}
                                </Col>
                            </Row>
                        </ListGroup>

                        <ListGroup>
                            <Button className='btn-block my-3' types='button' disable={product.countInStock === 0}>
                                Add To Cart
                            </Button>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>  
        </>
    )
}

export default ProductScreen
