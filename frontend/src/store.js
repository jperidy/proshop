import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productListReducer, productDetailsReducer } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';

// la fonction combineReducers, permet d'englober tous les reducers dans un reducer root.
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
});

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];

const initialState = {
    cart: { cartItems: cartItemsFromStorage }
};

const middleware = [thunk];

// Le store va stocker le global state de l'applications
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;