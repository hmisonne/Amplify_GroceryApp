export const userReducer = (state = {}, action) => {
    switch (action.type) {
      case "AUTHENTIFICATE_USER":
        return action.user;
      case "LOAD_GROCERY_LIST":
        const groceryListIDs = action.groceryLists.map(item => item.id);
        return {
          ...state,
          groceryLists: groceryListIDs
        };
      case "ADD_GROCERY_LIST":
        const newGroceryListID = action.groceryList.id;
        return {
          ...state,
          groceryLists: [...state.groceryLists, newGroceryListID]
        };
      case "DELETE_GROCERY_LIST":
        return {
          ...state,
          groceryLists: state.groceryLists.filter((groceryList) => groceryList !== action.id),
        };
    
      default:
        return state;
    }
  };

  export default userReducer