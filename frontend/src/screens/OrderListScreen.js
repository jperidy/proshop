import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'; 
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listOrders } from '../actions/orderActions';

const OrderListScreen = ({ history }) => {
    
    const dispatch = useDispatch();

    const orderList = useSelector(state => state.orderList);
    const { loading, error, orders } = orderList;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;


    useEffect(() => {

        if (userInfo && userInfo.isAdmin){
            dispatch(listOrders());
        } else {
            history.push('/login');
        }
    }, [dispatch, history, userInfo]);

    return (
        <>
         <h1>Orders</h1>
         {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
             <Table striped bordered hover responsive className='table-sm'>
                 <thead>
                     <tr>
                         <th className='align-middle'>ID</th>
                         <th className='align-middle'>USER</th>
                         <th className='align-middle'>DATE</th>
                         <th className='align-middle'>TOTAL</th>
                         <th className='align-middle text-center'>PAID</th>
                         <th className='align-middle text-center'>DELIVERED</th>
                         <th></th>
                     </tr>
                 </thead>
                 <tbody>
                     {orders.map(order => (
                         <tr key={order._id}>
                             <td className='align-middle'>{order._id}</td>
                             <td className='align-middle'>{order.user && order.user.name}</td>
                             <td className='align-middle'>{order.createdAt.substring(0,10)}</td>
                             <td className='align-middle'>${order.totalPrice}</td>
                             <td className='align-middle text-center'>
                                 {order.isPaid ? (
                                    order.paidAt.substring(0,10)
                                    ) : (
                                        <i className='fas fa-times' style={{ color: 'red' }}></i>
                                    ) }
                            </td>
                            <td className='align-middle text-center'>
                                 {order.isDelivered ? (
                                    order.deliveredAt.substring(0,10)
                                    ) : (
                                        <i className='fas fa-times' style={{ color: 'red' }}></i>
                                    ) }
                            </td>

                            <td className='text-center align-middle'>
                                <LinkContainer to ={`/order/${order._id}`}>
                                        <Button variant='light' className='btn-sm'>
                                            Details
                                        </Button>
                                </LinkContainer>
                                
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
