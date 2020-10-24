import { createNewProduct, removeProduct, updateProductDetails } from "../../../utils/api";

export const addProduct = (product) => ({
  type: "ADD_PRODUCT",
  product,
});

export const deleteProduct = (id) => ({
  type: "DELETE_PRODUCT",
  id,
});

export const loadProducts = (products) => ({
  type: "LOAD_PRODUCTS",
  products,
});

export const filterProductsbyCat = (category) => ({
  type: "FILTER_PRODUCTS",
  category,
});

export const toggleProduct = (id) => ({
  type: "TOGGLE_PRODUCT",
  id,
});

export const updateProduct = (updatedProduct) => ({
  type: "UPDATE_PRODUCT",
  updatedProduct
});

export function handleUpdateProduct(product){
  return (dispatch) => {
    return updateProductDetails(product)
    .then((product) => dispatch(updateProduct(product)))
  }
}

export function handleAddProduct(product, groceryListID){
  return (dispatch) => {
    return createNewProduct(product, groceryListID)
    .then((product) => dispatch(addProduct(product)))
  }
}

export function handleDeleteProduct(id){
  return (dispatch) => {
    return removeProduct(id)
    .then(() => dispatch(deleteProduct(id)))
  }
}
