import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const SearchBox = ({ history }) => {
    
    const [keyword, setKeyword] = useState("");

    const submitHandler = (e) => {
        e.preventDefault();
        if(keyword.trim()){
            // history is not accessible because we are in the header
            history.push(`/search/${keyword}`)
        } else {
            history.push('/');
        }
    }

    return (
        <Form onSubmit={submitHandler} inline>
            <Form.Control 
                type='text'
                name='q'
                onChange={(e) => setKeyword(e.target.value)}
                placeholder='Search Products...'
                className='mr-sm-2 ml-sm-5'
            ></Form.Control>
            <Button type='submit' variant='outline-success' className='p-2'>
                Search
            </Button>
        </Form>
    )
};

export default SearchBox;
