import { combineReducers } from 'redux';
import _ from 'lodash';

export const productReducer = (state = [], action) => {
    switch(action.type){
        case "LOAD_PRODUCTS":
            const products = action.products
            return products
        case "ADD_PRODUCT":
            const newProduct = action.product
            return [...state, newProduct]
        case "DELETE_PRODUCT":
            return state.filter(product => (product.id !== action.id))
        case "TOGGLE_PRODUCT":
            return state.map(product => (product.id === action.id)
            ? {...product, checked: !product.checked}
            : product
            )
        default:
            return state;
    }
}

export const userReducer = (state = {}, action) => {
    switch(action.type){
        case "AUTHENTIFICATE_USER":
            return action.user
        default:
            return state;
    }
}

export default combineReducers({
    products: productReducer,
    user: userReducer
});