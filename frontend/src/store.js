import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productListReducer, productDetailsReducer } from './reducers/productReducers';

// la fonction combineReducers, permet d'englober tous les reducers dans un reducer root.
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
});

const initialState = {};

const middleware = [thunk];

// Le store va stocker le global state de l'applications
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;