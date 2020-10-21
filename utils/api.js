
import { authentificateUser } from "../src/redux/actions/user";
import {
    deleteGroceryList,
    loadGroceryLists,
  } from "../src/redux/actions/groceryList";
import { DataStore } from "@aws-amplify/datastore";
import { User, GroceryList, UserGroceryListJoin } from "../src/models";
import { Auth } from "aws-amplify";

export async function identifyUser(dispatch) {
  try {
    const userInfo = await Auth.currentUserInfo();
    const result = await DataStore.query(User, (c) =>
      c.sub("eq", userInfo.attributes.sub,)
    );

    let currentUser = result[0]
    if (currentUser === undefined){
      currentUser = await createUser(userInfo)
    }
    
    currentUser && dispatch(authentificateUser(currentUser));
    console.log("User info retrieved successfully!");
  } catch (error) {
    console.log("Error retrieving user info", error);
  }
}

async function createUser(userInfo) {
  try {
    const userDetails = {
      sub: userInfo.attributes.sub,
    };
    const newUser = await DataStore.save(new User(userDetails));
    console.log("new User created successfully", newUser);
    return newUser;
  } catch (err) {
    console.log("error creating new User", err);
  }
}

export async function fetchAllGroceryLists(setGlistState) {
  try {
    const allGroceryLists = await DataStore.query(GroceryList);
    setGlistState(allGroceryLists);
    console.log("grocery lists retrieved successfully!");
  } catch (error) {
    console.log("Error retrieving grocery lists", error);
  }
}

export async function removeGroceryListFromUser(id, user, dispatch) {
    try {
      dispatch(deleteGroceryList(id));
      const result = (await DataStore.query(UserGroceryListJoin))
      .filter(c => c.groceryList.id === id)
      .filter(c => c.user.id === user.id)
      DataStore.delete(result[0]);
      console.log("Grocery list deleted from User successfully!");
    } catch (err) {
      console.log("error deleting list", err);
    }
  }

  

  export async function fetchUserGroceryLists(dispatch, user) {
    try {
        const result = (await DataStore.query(UserGroceryListJoin)).filter(c => c.user.id === user.id)
        const groceryListsPerUser = result.map(element => element.groceryList) || []
        dispatch(loadGroceryLists(groceryListsPerUser));
        console.log("grocery lists retrieved successfully!");
    } catch (error) {
      console.log("Error retrieving grocery lists", error);
    }
  }

  export async function addGroceryListToUser(groceryListID, currUser) {
    try {
      const user = await DataStore.query(User, currUser.id)
      const groceryList = await DataStore.query(GroceryList, groceryListID)
      await DataStore.save(
        new UserGroceryListJoin({
          user,
          groceryList
        })
      )
      console.log("Grocery list added to user successfully!");
    } catch (error) {
      console.log("Error adding grocery list to user", error);
    }
  }


  export async function createNewGroceryList (groceryList, user) {
    try {
      const groceryListSaved = await DataStore.save(
      new GroceryList({
        name: groceryList.name,
        description: groceryList.description,
      })
    );
    // Update User instance with new Grocery List
    const currentUser = await DataStore.query(User, (c) =>
      c.sub("eq", user.sub)
    );

    await DataStore.save(
      new UserGroceryListJoin({
        user: currentUser[0],
        groceryList: groceryListSaved
      })
    )
    console.log("List saved successfully!");
  } catch (err) {
    console.log("error creating list:", err);
  }
}