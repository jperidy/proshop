import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const protect = asyncHandler (async (req, res, next) => {
    
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        
        try {
            token = req.headers.authorization.split(' ')[1]; // delete of first keyword Bearer seperated with space with token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            req.user = await User.findById(decoded.id).select('-password'); // we don't want to add password in the req

            next();
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error('Not authorized, token failed')
        }
    }

    if(!token){
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});

const admin = (req, res, next) => {
    if(req.user && req.user.isAdmin) {
        next(); // if user is admin we can continue :)
    } else {
        res.status(401);
        throw new Error('Not authorized as an admin');
    }
}

export { protect, admin };