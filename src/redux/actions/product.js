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

export const toggleProduct = (id, attribute) => ({
  type: "TOGGLE_PRODUCT",
  id,
  attribute
});

export const updateProduct = (updatedProduct) => ({
  type: "UPDATE_PRODUCT",
  updatedProduct
});

export const deleteAllProducts = (groceryListID) => ({
  type: "DELETE_ALL_PRODUCT",
  groceryListID
});

export const toggleMultipleProducts = (groceryListID, attribute, keepToBuy) => ({
  type: "TOGGLE_MULTIPLE_PRODUCTS",
  attribute,
  groceryListID,
  keepToBuy
})

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

export function handleToggleProduct(product, attribute='checked'){
  return (dispatch) => {
    const updatedProduct = {
      ...product, 
      [attribute]: !product[attribute],
      checked: attribute == "toBuy" ? false : !product[attribute]
       
    }
    return API.updateProductDetails(updatedProduct)
    .then(() => dispatch(toggleProduct(product.id, attribute)))
  }
}

export function handleDeleteAllProducts(groceryListID){
  return (dispatch) => {
    return API.removeAllProducts(groceryListID)
    .then(() => dispatch(deleteAllProducts(groceryListID)))
  }
}

export function handleToggleMultipleProducts(groceryListID, attribute, keepToBuy=false){
  return (dispatch) => {
    return API.toggleMultipleProducts(groceryListID, attribute, keepToBuy)
    .then(() => dispatch(toggleMultipleProducts(groceryListID, attribute, keepToBuy)))
  }
}