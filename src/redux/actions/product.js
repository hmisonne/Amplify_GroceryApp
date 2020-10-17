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