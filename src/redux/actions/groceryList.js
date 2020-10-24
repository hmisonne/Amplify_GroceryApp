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
  return (dispatch, getState) => {
		const {user} = getState()

		return API.fetchUserGroceryLists (user)
			.then((groceryLists)=> dispatch(loadGroceryLists(groceryLists)))
	}
}

export function handleDeleteGroceryList(id) {
  return (dispatch, getState) => {
		const {user} = getState()
		return API.removeGroceryListFromUser(id, user)
			.then(()=> dispatch(deleteGroceryList(id)))
	}
}

export function handleAddGroceryList(id) {
  return (dispatch, getState) => {
		const {user} = getState()
		return API.addGroceryListToUser(id, user)
			.then((groceryList)=> dispatch(addGroceryList(groceryList)))
	}
}

export function handleCreateGroceryList(groceryList) {
  return (dispatch, getState) => {
		const {user} = getState()
		return API.createNewGroceryList(groceryList, user)
			.then((groceryList)=> dispatch(addGroceryList(groceryList)))
	}
}