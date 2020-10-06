export const addGroceryList = (groceryList) => ({
    type: "ADD_GROCERY_LIST",
    groceryList,
});

export const loadGroceryLists = (groceryLists) => ({
    type: "LOAD_GROCERY_LIST",
    groceryLists,
});