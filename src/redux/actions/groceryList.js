import { createNewGroceryList, fetchUserGroceryLists } from "../../../utils/api";

export const addGroceryList = (groceryList) => ({
  type: "ADD_GROCERY_LIST",
  groceryList,
});

export const loadGroceryLists = (groceryLists) => ({
  type: "LOAD_GROCERY_LIST",
  groceryLists,
});

export const deleteGroceryList = (id) => ({
  type: "DELETE_GROCERY_LIST",
  id,
});

// export function handleAddGroceryList(){
//   return (dispatch, getState) => {
//     const {user} = getState()
//     return createNewGroceryList(groceryList)
//     .then((groceryList) => dispatch(addGroceryList(groceryList)))
//   }
// }

export function handleLoadGroceryLists() {
  return (dispatch, getState) => {
		const {user} = getState()

		return fetchUserGroceryLists (user)
			.then((groceryLists)=> dispatch(loadGroceryLists(groceryLists)))
	}
}