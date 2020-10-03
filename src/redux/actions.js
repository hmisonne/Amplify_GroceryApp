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

export const toggleProduct = (id) => ({
    type: "TOGGLE_PRODUCT",
    id,
});

export const authentificateUser = (user) => ({
    type: "AUTHENTIFICATE_USER",
    user,
});