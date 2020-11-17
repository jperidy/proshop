import React from 'react';
import {Row, Col, Container, Button, Form } from 'react-bootstrap';

const FilterRow = ({ submitHandler, deleteFilter, setKeyword, keyword }) => {
    return (
        <Form onSubmit={submitHandler}>
            <Container fluid>
                <Row className="no-gutters align-items-center">
                    <Col xs={8}>
                        <Form.Control
                            type='text'
                            name='q'
                            onChange={(e) => setKeyword(e.target.value)}
                            placeholder='Search Id...'
                            value={keyword}
                        ></Form.Control>
                    </Col>
                    <Col xs='auto'>
                        <Button
                            className='btn-light p-1 m-1'
                            onClick={(e) => deleteFilter(e)}
                        ><i className="fas fa-backspace" style={{color: 'red'}}></i>
                        </Button>
                    </Col>
                </Row>
            </Container>
        </Form>
    )
}

export default FilterRow;
