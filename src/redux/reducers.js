import { combineReducers } from 'redux';
import _ from 'lodash';

export const ProductReducer = (state = [], action) => {
    switch(action.type){
        case "ADD_PRODUCT":
            const newProduct = action.product
            return [...state, newProduct]
        default:
            return state;
    }
}

export default combineReducers({
    product: ProductReducer,
});