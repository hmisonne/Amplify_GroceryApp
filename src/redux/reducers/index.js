import { combineReducers } from 'redux'
import products from './products'
import groceryLists from './groceryLists'
import user from './user'

const reducers = combineReducers({
    products,
    groceryLists,
    user
  })

export default reducers