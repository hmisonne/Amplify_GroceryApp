import { API } from "../../../utils/api";
import { DataStore, syncExpression } from 'aws-amplify'
import {  GroceryList, Product } from "../../models";


let groceryListIDs = ['']

const listPredicate = (c, list, field) => {
  return c.or((c) => list.reduce((_c, operand) => _c[field]('eq', operand), c));
};

DataStore.configure({
  syncExpressions: [
    syncExpression(Product, () => {
      return (c) => listPredicate(c, groceryListIDs, 'groceryListID');
    }),
    syncExpression(GroceryList, () => {
      return (c) => listPredicate(c, groceryListIDs, 'id');
    }),
  ],
});

export const createGroceryList = (groceryList) => ({
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

export const addGroceryListToUser = (id) => ({
	type: "ADD_GROCERY_LIST_TO_USER",
	id,
  });

export function handleLoadGroceryLists() {
  return (dispatch, getState) => {
		const {user} = getState()
		return API.fetchUserGroceryLists(user)
			.then((groceryLists)=> dispatch(loadGroceryLists(groceryLists)))
	}
}

export function handleDeleteGroceryList(id) {
  return (dispatch, getState) => {
		const {user} = getState()
		return API.removeGroceryListFromUser(id, user)
			.then(()=> {
				syncDatastore(id, "REMOVE")
				dispatch(deleteGroceryList(id))})
	}
}

export function handleAddGroceryList(id) {
  return (dispatch, getState) => {
		const {user} = getState()
		return API.addGroceryListToUser(id)
			.then(()=> {
				syncDatastore(id, "ADD")
				dispatch(addGroceryListToUser(id))})
	}
}

export function handleCreateGroceryList(groceryList) {
  return (dispatch, getState) => {
		const {user} = getState()
		return API.createNewGroceryList(groceryList, user)
			.then((groceryList)=> {
				syncDatastore(groceryList.id, "ADD")
				dispatch(addGroceryListToUser(groceryList.id))
			})
	}
}


export async function syncDatastore(payload, action){
	switch (action){
		case "LOAD":
			console.log('syncDatastore LOAD', payload)
			groceryListIDs = payload
			return restartDataStore()
		case "ADD":
			console.log('syncDatastore ADD', payload)
			if(groceryListIDs[0] === ''){
				groceryListIDs[0] = payload
			} else {
				groceryListIDs = [...groceryListIDs, payload]
			}
			return restartDataStore()
		case "REMOVE":
			console.log('syncDatastore REMOVE')
			if (groceryListIDs.includes(payload)){
				groceryListIDs = groceryListIDs.filter(groceryListID=> groceryListID !== payload)
				if(groceryListIDs.length === 0){
					groceryListIDs[0] = ''
				}
				return restartDataStore()
			}
			return
		default:
			return
	}
  }



  export async function restartDataStore(){
    await DataStore.stop();
    await DataStore.start();
  }
