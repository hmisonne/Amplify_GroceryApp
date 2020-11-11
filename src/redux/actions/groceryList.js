import { API } from "../../../utils/api";
import { DataStore, syncExpression } from 'aws-amplify'
import {  GroceryList, Product } from "../../models";


// let groceryListIDs = ['1b2c6e03-241a-4205-b884-5dfe132b526d','306ac6f3-ea62-4d5f-aee7-f7112d716db3']
let groceryListIDs = ['']

const listPredicate = (c, list, field) => {
  console.log('groceryListIDs',groceryListIDs)
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
		return API.fetchUserGroceryLists(user.id)
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

export function handleAddGroceryList() {
  return (dispatch, getState) => {
		const {user} = getState()
		return API.addGroceryListToUser()
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


export async function syncDatastore(id, action){
	console.log('sync DS', id, action)
	switch (action){
		case "ADD":
			console.log('ADD')
			groceryListIDs[0] === '' ?
			groceryListIDs[0] = id
			: groceryListIDs.push(id)
			return restartDataStore()
		case "REMOVE":
			console.log('REMOVE')
			if (groceryListIDs.includes(id)){
				groceryListIDs = groceryListIDs.filter(groceryListID=> groceryListID !== id)
				if(groceryListIDs.length === 0){
					groceryListIDs[0] = ''
				}
				return restartDataStore()
			}
			return
		default:
			console.log('default')
			return restartDataStore();
	}
  }



  export async function restartDataStore(){
    await DataStore.stop();
    await DataStore.start();
  }

