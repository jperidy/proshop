import React, { useEffect, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { deleteOrder, listOrders } from '../actions/orderActions';
import { ORDER_DETAILS_RESET } from '../constants/orderConstants';
import FilterRow from '../components/FilterRow';

const OrderListScreen = ({ history, match }) => {

    const dispatch = useDispatch();

    const [keywordId, setIdKeyword] = useState("");
    const [keywordUser, setUserKeyword] = useState("");

    const [keywordIdSubmit, setIdKeywordSubmit] = useState("");
    const [keywordUserSubmit, setUserKeywordSubmit] = useState("");


    const orderList = useSelector(state => state.orderList);
    const { loading, error, orders } = orderList;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const orderDelete = useSelector(state => state.orderDelete);
    const { success: successOrderDelete } = orderDelete;

    dispatch({ type: ORDER_DETAILS_RESET });


    useEffect(() => {

        if (userInfo && userInfo.isAdmin) {
            dispatch(listOrders(keywordIdSubmit, keywordUserSubmit));
        } else {
            history.push('/login');
        }
    }, [dispatch, history, userInfo, successOrderDelete, keywordIdSubmit, keywordUserSubmit]);


    const deleteHandler = (id) => {
        if (window.confirm(`Are you sure to delete order ID: ${id} ?`)) {
            dispatch(deleteOrder(id));
        }
    };
    

    const submitIdHandler = (e) => {
        e.preventDefault();
        if(keywordId.trim()){
            setIdKeywordSubmit(keywordId);
        }
    };

    const deleteIdFilter = (e) => {
        e.preventDefault();
        setIdKeyword('');
        setIdKeywordSubmit('');
    };

    const submitUserHandler = (e) => {
        e.preventDefault();
        if(keywordUser.trim()){
            setUserKeywordSubmit(keywordUser);
        }
    };

    const deleteUserFilter = (e) => {
        e.preventDefault();
        setUserKeyword('');
        setUserKeywordSubmit('');
    };

    return (
        <>
            <h1>Orders</h1>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th className='align-middle text-center'>
                                <FilterRow 
                                    submitHandler={submitIdHandler}
                                    deleteFilter={deleteIdFilter}
                                    setKeyword={setIdKeyword}
                                    keyword={keywordId}
                                />
                                
                            </th>
                            <th className='align-middle text-center'>
                            <FilterRow 
                                    submitHandler={submitUserHandler}
                                    deleteFilter={deleteUserFilter}
                                    setKeyword={setUserKeyword}
                                    keyword={keywordUser}
                                />
                            </th>
                            <th className='align-middle text-center'></th>
                            <th className='align-middle text-center'></th>
                            <th className='align-middle text-center'></th>
                            <th className='align-middle text-center'></th>
                            <th></th>
                            <th></th>
                        </tr>

                        <tr>
                            <th className='align-middle text-center'>ID</th>
                            <th className='align-middle text-center'>USER</th>
                            <th className='align-middle text-center'>DATE</th>
                            <th className='align-middle text-center'>TOTAL</th>
                            <th className='align-middle text-center'>PAID</th>
                            <th className='align-middle text-center'>DELIVERED</th>
                            <th></th>
                            <th></th>
                        </tr>

                    </thead>
                    <tbody>
                        
                        {orders.map(order => (
                            <tr key={order._id}>
                                <td className='align-middle'>{order._id}</td>
                                <td className='align-middle'>{order.user && order.user.name}</td>
                                <td className='align-middle'>{order.createdAt.substring(0, 10)}</td>
                                <td className='align-middle'>${order.totalPrice}</td>
                                <td className='align-middle text-center'>
                                    {order.isPaid ? (
                                        order.paidAt.substring(0, 10)
                                    ) : (
                                            <i className='fas fa-times' style={{ color: 'red' }}></i>
                                        )}
                                </td>
                                <td className='align-middle text-center'>
                                    {order.isDelivered ? (
                                        order.deliveredAt.substring(0, 10)
                                    ) : (
                                            <i className='fas fa-times' style={{ color: 'red' }}></i>
                                        )}
                                </td>

                                <td className='text-center align-middle'>
                                    <LinkContainer to={`/order/${order._id}`}>
                                        <Button variant='light' className='btn-sm'>
                                            Details
                                        </Button>
                                    </LinkContainer>
                                </td>

                                <td className='text-center align-middle'>
                                    <Button
                                        variant='danger'
                                        className='btn-sm'
                                        onClick={() => deleteHandler(order._id)}
                                        disabled={order.isPaid ? true : false}
                                    ><i className='fas fa-trash'></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    )
}

export default OrderListScreen
