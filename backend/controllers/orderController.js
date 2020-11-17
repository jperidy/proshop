import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';

// @desc    Create New Order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async(req,res) =>{
    
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    if(orderItems && orderItems.lenth === 0) {
        res.status(400);
        throw new Error('No order items');
        return
    } else {

        let item = ''

        for (let i = 0; i < orderItems.length; i++) {

            item = orderItems[i];
            const product = await Product.findById(item.product);

            if (product.countInStock >= item.qty) {
                product.countInStock = product.countInStock - item.qty;
                //console.log('product', product);
                product.save();
            } else {
                res.status(500);
                throw new Error(`Problem : product out of stock: ${item.name} quantity max available: ${product.countInStock}`);
            }
        }

        const order = new Order({
            orderItems,
            user: req.user._id, // user ID from token
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        });
        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    }
});

// @desc    Get order by Id
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async(req,res) =>{
    
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (order) {
        res.json(order);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
});

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async(req,res) =>{
    
    const order = await Order.findById(req.params.id);

    if (order) {

        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id:req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address
        };

        const updateOrder = await order.save();

        res.json(updateOrder);

    } else {
        res.status(404);
        throw new Error('Order not found');
    }
});

// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async(req,res) =>{
    
    const order = await Order.findById(req.params.id);

    if (order) {

        order.isDelivered = true;
        order.deliveredAt = Date.now();

        const updateOrder = await order.save();

        res.json(updateOrder);

    } else {
        res.status(404);
        throw new Error('Order not found');
    }
});


// @desc    Get logged in user orders
// @route   PUT /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async(req,res) =>{
    
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
 
});

const filterOrders = (order, conditions) => {
    const { keywordId, keywordUser } = conditions;
    
    var idMatch = true; // by default we want to display
    var userMatch = true; // by default we want to display
    
    if (keywordId){
        idMatch = order._id.toString().toLowerCase().match(keywordId.toLowerCase()) !== null;
    }
    if (keywordUser) {
        userMatch = order.user.name.toLowerCase().match(keywordUser.toLowerCase()) !== null
    }
    console.log('resultFilter', idMatch && userMatch)

    return idMatch && userMatch;

};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async(req,res) =>{

    const keywordId = req.query.keywordId && req.query.keywordId;
    const keywordUser = req.query.keywordUser && req.query.keywordUser;
    const conditions = {keywordId, keywordUser};

    const orders = await Order.find({}).populate('user', 'id name');

    var results = [];

    if (keywordId || keywordUser){
        results = orders.filter( order => filterOrders(order, conditions));
    } else {
        results = orders;
    }
    console.log(results);

    res.json(results);
 
});

// @desc    Delete an order
// @route   DELETE /api/orders/:id
// @access  Private/Admin
const deleteOrder = asyncHandler(async(req,res) =>{
    
    const order = await Order.findById(req.params.id)

    if (order) {
        await order.remove()
        res.json({ message: 'Order removed' });
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
});

export {
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getMyOrders,
    getOrders,
    deleteOrder
}