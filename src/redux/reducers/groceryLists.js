import undoable from 'redux-undo'

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

  const undoableGroceryLists = undoable(groceryListReducer)

  export default undoableGroceryLists