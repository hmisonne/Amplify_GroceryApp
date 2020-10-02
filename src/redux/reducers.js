import { combineReducers } from 'redux';
import _ from 'lodash';

export const ProductReducer = (state = [], action) => {
    switch(action.type){
        case "LOAD_PRODUCTS":
            const products = action.products
            return products
        case "ADD_PRODUCT":
            const newProduct = action.product
            return [...state, newProduct]
        case "DELETE_PRODUCT":
            return state.filter(product => (product.id !== action.id))
        default:
            return state;
    }
}

export default combineReducers({
    products: ProductReducer,
});