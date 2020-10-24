import { API } from "../../../utils/api";

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
    return API.updateProductDetails(product)
    .then((product) => dispatch(updateProduct(product)))
  }
}

export function handleAddProduct(product, groceryListID){
  return (dispatch) => {
    return API.createNewProduct(product, groceryListID)
    .then((product) => dispatch(addProduct(product)))
  }
}

export function handleDeleteProduct(id){
  return (dispatch) => {
    return API.removeProduct(id)
    .then(() => dispatch(deleteProduct(id)))
  }
}

export function handleLoadProducts(groceryListID){
  return (dispatch) => {
    return API.fetchProductsByGroceryList(groceryListID)
    .then((products) => dispatch(loadProducts(products)))
  }
}

export function handleToggleProduct(product){
  return (dispatch) => {
    const updatedProduct = {...product, checked: !product.checked}
    return API.updateProductDetails(updatedProduct)
    .then(() => dispatch(toggleProduct(product.id)))
  }
}