import productReducer from "../reducers/products";

import {
  addProduct,
  deleteProduct,
  toggleProduct,
  loadProducts,
  filterProductsbyCat,
  updateProduct,
  deleteAllProducts,
  toggleMultipleProducts,
} from "../actions/product";


describe("product reducer", () => {
  const product = {
    name: "Berry",
    category: "Fruits",
    value: 2,
    unit: "ct",
    checked: false,
    groceryListID: "123",
    toBuy: false,
    id: "1",
  };
  const product2 = {
    name: "Chicken",
    category: "Meat",
    value: 1,
    unit: "ct",
    groceryListID: "123",
    toBuy: true,
    checked: true,
    id: "2",
  };
  const product3 = {
    name: "Turkey patty",
    category: "Meat",
    value: 2,
    unit: "ct",
    groceryListID: "124",
    toBuy: true,
    checked: true,
    id: "3",
  };

  it("should add 1 product with a false checked status when using the addProduct function", () => {
    const newState = productReducer(undefined, addProduct(product));
    expect(newState.length).toEqual(1);
    expect(newState[0]).toEqual(product);
  });
  it("should change the checked status to true on toggleProduct", () => {
    const stateOne = productReducer(undefined, addProduct(product));
    const stateTwo = productReducer(stateOne, toggleProduct("1", "checked"));
    expect(stateTwo[0].checked).toEqual(!stateOne[0].checked);
  });
  it("should remove a Product from the state on deleteProduct", () => {
    const stateOne = productReducer(undefined, addProduct(product));
    const stateTwo = productReducer(stateOne, deleteProduct("1"));
    expect(stateTwo.length).toEqual(stateOne.length - 1);
  });
  it("should load multiple products", () => {
    const newState = productReducer(
      undefined,
      loadProducts([product, product2])
    );
    expect(newState.length).toEqual(2);
    expect(newState[0]).toEqual(product);
  });
  it("should filter products by category", () => {
    const stateOne = productReducer(
      undefined,
      loadProducts([product, product2, product3])
    );
    const stateTwo = productReducer(stateOne, filterProductsbyCat("Meat"));
    const stateThree = productReducer(stateOne, filterProductsbyCat("Fruits"));
    expect(stateTwo.length).toEqual(2);
    expect(stateTwo[0].category).toEqual("Meat");
    expect(stateTwo[1].category).toEqual("Meat");
    expect(stateThree.length).toEqual(1);
    expect(stateThree[0].category).toEqual("Fruits");
  });
  it("should update a Product", () => {
    const updatedProduct = {
      name: "Berries",
      category: "Fruits",
      value: 20,
      unit: "lb",
      checked: false,
      id: "1",
    };
    const stateOne = productReducer(
      undefined,
      loadProducts([product, product2, product3])
    );
    const stateTwo = productReducer(stateOne, updateProduct(updatedProduct));
    expect(stateTwo.filter((product) => product.id === "1")[0]).toEqual(
      updatedProduct
    );
  });
  it("should delete all product from a grocery list", () => {
    const groceryListID = "123";
    const stateOne = productReducer(
      undefined,
      loadProducts([product, product2, product3])
    );
    const stateTwo = productReducer(stateOne, deleteAllProducts(groceryListID));
    expect(stateTwo.length).toEqual(1);
    expect(stateTwo[0].groceryListID).not.toEqual("123");
  });
  it("should toggle toBuy to false for all products in a list", () => {
    const groceryListID = "123";
    const stateOne = productReducer(
      undefined,
      loadProducts([product, product2, product3])
    );
    const stateTwo = productReducer(
      stateOne,
      toggleMultipleProducts(groceryListID, "toBuy")
    );
    expect(stateTwo.length).toEqual(stateOne.length);
    expect(stateTwo[1].toBuy).toEqual(false);
    // products with different grocery list ID should not be affected
    expect(stateTwo[2].toBuy).toEqual(true);
  });
  it("should toggle checked to false for all products in a list", () => {
    const groceryListID = "123";
    const stateOne = productReducer(
      undefined,
      loadProducts([product, product2, product3])
    );
    const stateTwo = productReducer(
      stateOne,
      toggleMultipleProducts(groceryListID, "checked")
    );
    expect(stateTwo.length).toEqual(stateOne.length);
    expect(stateTwo[1].checked).toEqual(false);
    // products with different grocery list ID should not be affected
    expect(stateTwo[2].checked).toEqual(true);
  });
});
