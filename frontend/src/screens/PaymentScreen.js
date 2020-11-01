import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'; 
import FormContainer from '../components/FormContainer';
import CheckOutSteps from '../components/CheckOutSteps';
import { savePaymentMethod } from '../actions/cartActions';

const PaymentScreen = ({ history }) => {

    //const user = useSelector(state => state.userLogin);
    //const { userInfo } = user;

    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;

    if (!shippingAddress) {
        history.push('/shipping');
    }
    
    //const [paymentMethod, setPaymentMethod] = useState(cart.paymentMethod.id);
    const [paymentMethod, setPaymentMethod] = useState(cart.paymentMethod);
    const [buttonState, setButtonState] = useState(paymentMethod ? false : true); // the button is desabled by default

    //if (paymentMethod){ setButtonState('false') }

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        history.push('/placeorder');
    };

    return (
        <FormContainer>
            <CheckOutSteps step1 step2 step3 />
            <h1>Payment Method</h1>
            <Form onSubmit={submitHandler} >
                <Form.Group>
                    <Form.Label as='legend'>Select Method</Form.Label>
                <Col>
                    <Form.Check 
                        type='radio' 
                        label='Paypal or Credit Card' 
                        id='Paypal' 
                        name='paymentMethod'
                        value='Paypal'
                        checked={ paymentMethod === 'Paypal' }
                        onChange={(e) => {
                            //setPaymentMethod(e.target.value);
                            setPaymentMethod(e.target.value)
                            setButtonState(false);
                        }
                        }>
                    </Form.Check>
                    <Form.Check 
                        type='radio' 
                        label='Stripe' 
                        id='Stripe' 
                        name='paymentMethod'
                        value='Stripe'
                        checked={ paymentMethod === 'Stripe' }
                        onChange={(e) => {
                            setPaymentMethod(e.target.value);
                            setButtonState(false);
                        }
                        }>
                    </Form.Check>
                </Col>
                </Form.Group>
                <Button type='submit' variant='primary' disabled={buttonState}>
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen;
