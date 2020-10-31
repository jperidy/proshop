import React, { useState, useEffect } from 'react';
//import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'; 
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
//import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

const ProfileScreen = ({ location, history }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);
    const [messageUpdate, setMessageUpdate] = useState(null);

    const dispatch = useDispatch();

    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    //const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
    //const { success } = userUpdateProfile;

    useEffect(() => {
        if(!userInfo) {
            history.push('/login');
        } else {
            if (!user || !user.name) {
                //dispatch({ type: USER_UPDATE_PROFILE_RESET });
                // if not user name we collect user informations
                dispatch(getUserDetails('profile'));
            } else {
                setName(user.name);
                setEmail(user.email);
            }
        }
    }, [dispatch, history, userInfo, user]);

    const submitHandler = (e) => {
        const form = e.currentTarget;
        // Verification of validity of data
        if (form.checkValidity() === false) {
            setMessage('Please check your information');
        } else {
            e.preventDefault(); // to avoid page to refresh
            // Dispatch Register
            setMessage(null); // to reinitialize the message before testing
            setMessageUpdate(null);
            if (password !== confirmPassword) {
                setMessage('Passwords do not match')
            } else {
                dispatch(updateUserProfile({ id:user._id, name, password }));
                setMessageUpdate('Profile Updated');
                //dispatch(getUserDetails('profile'));
            }
        }
    };

    return (
        <Row>
            <Col md={3}>
                <h2>User Profil</h2>
                {message && <Message variant='danger'>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {messageUpdate && <Message variant='success'>{messageUpdate}</Message>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type='name'
                            placeholder='Enter Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='email'>
                        <Form.Label>Email Adress</Form.Label>
                        <Form.Control
                            type='email'
                            placeholder='Enter Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Enter password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='confirm-password'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Confirm password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Button type='submit' variat='primary'>
                        Update
                    </Button>
                </Form>
            </Col>
            
            <Col md={9}>
                <h2>My Orders</h2>
            </Col>

        </Row>
    );
};

export default ProfileScreen;
