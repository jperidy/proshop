import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Col, Row, Image, ListGroup, Card, Button } from 'react-bootstrap'
import Rating from '../components/Rating'
import axios from 'axios'


const ProductScreen = ( {match} ) => {
    const [product, setProduct] = useState({})

    useEffect(() => {
        const fetchProduct = async() => {
            const { data } = await axios.get(`/api/products/${match.params.id}`)

            setProduct(data)
        }

        fetchProduct()
    }, [match])

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
                            <Row className='my-1'>
                                <Col>Price:</Col>
                                <Col>
                                    <strong>${product.price}</strong>
                                </Col>
                            </Row>
                        </ListGroup>

                        <ListGroup variant='flush'>
                            <Row className='my-1'>
                                <Col>Status:</Col>
                                <Col>
                                    {product.countInStock > 0 ? 'In Stock' : "Out Of Stock"}
                                </Col>
                            </Row>
                        </ListGroup>

                        <ListGroup>
                            <Button className='btn-block mt-3' types='button' disabled={product.countInStock === 0}>
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
