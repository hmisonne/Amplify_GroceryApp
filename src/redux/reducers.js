import { combineReducers } from "redux";
import _ from "lodash";

export const productReducer = (state = [], action) => {
  switch (action.type) {
    case "LOAD_PRODUCTS":
      const products = action.products;
      return products;
    case "FILTER_PRODUCTS":
      return state.filter((product) => product.category === action.category);
    case "ADD_PRODUCT":
      const newProduct = action.product;
      return [...state, newProduct];
    case "DELETE_PRODUCT":
      return state.filter((product) => product.id !== action.id);
    case "TOGGLE_PRODUCT":
      return state.map((product) =>
        product.id === action.id
          ? { ...product, checked: !product.checked }
          : product
      );
      case "UPDATE_PRODUCT":
        const updatedProduct = action.updatedProduct;
        return state.map((product) =>
          product.id === updatedProduct.id
            ? updatedProduct
            : product
        );
    default:
      return state;
  }
};
export const groceryListReducer = (state = [], action) => {
  switch (action.type) {
    case "LOAD_GROCERY_LIST":
      const groceryLists = action.groceryLists;
      return groceryLists;
    case "ADD_GROCERY_LIST":
      const newGroceryList = action.groceryList;
      return [...state, newGroceryList];
    case "DELETE_GROCERY_LIST":
      return state.filter((gorceryList) => gorceryList.id !== action.id);
    default:
      return state;
  }
};

export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case "AUTHENTIFICATE_USER":
      return action.user;
    case "ADD_GROCERYLIST_TO_USER":
      const newGroceryListID = action.groceryListID;
      return {
        ...state,
        userGroceryListID: [...state.userGroceryListID, newGroceryListID]
      }
    case "DELETE_GROCERY_LIST":
      return {
        ...state,
        userGroceryListID: state.userGroceryListID.filter((gorceryList) => gorceryList !== action.id)
      }
    default:
      return state;
  }
};

export default combineReducers({
  products: productReducer,
  groceryLists: groceryListReducer,
  user: userReducer,
});
