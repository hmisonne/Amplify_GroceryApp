export const productReducer = (state = [], action) => {
    let { groceryListID } = action;
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
            ? { ...product, [action.attribute]: action.attribute === 'checked'? 
            !product.checked
          : !product.toBuy}
            : product
        );
        case "UPDATE_PRODUCT":
          const updatedProduct = action.updatedProduct;
          return state.map((product) =>
            product.id === updatedProduct.id
              ? updatedProduct
              : product
          );
        case "UNCHECK_ALL_PRODUCT":
          return state.map((product) =>
            product.groceryListID === groceryListID
              ? { ...product, 
                checked: false 
              }
              : product
          );
        case "DELETE_ALL_PRODUCT":
          return state.filter((product) =>
            product.groceryListID !== groceryListID
          );
      default:
        return state;
    }
  };
  
  export default productReducer