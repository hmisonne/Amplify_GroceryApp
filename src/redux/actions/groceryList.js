import { API } from "../../../utils/api";

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


export function handleLoadGroceryLists() {
  return (dispatch) => {

		return API.fetchUserGroceryLists ()
			.then((groceryLists)=> dispatch(loadGroceryLists(groceryLists)))
	}
}

export function handleDeleteGroceryList(id) {
  return (dispatch, getState) => {
		return API.removeGroceryListFromUser(id)
			.then(()=> dispatch(deleteGroceryList(id)))
	}
}

export function handleAddGroceryList(id) {
  return (dispatch) => {

		return API.addGroceryListToUser(id)
	}
}

export function handleCreateGroceryList(groceryList) {
  return (dispatch) => {
		return API.createNewGroceryList(groceryList)
			.then((groceryList)=> dispatch(addGroceryList(groceryList)))
	}
}