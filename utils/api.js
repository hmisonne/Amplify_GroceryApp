
import { authentificateUser, addListToUser } from "../src/redux/actions/user";
import {
    deleteGroceryList,
    loadGroceryLists,
  } from "../src/redux/actions/groceryList";
import { DataStore } from "@aws-amplify/datastore";
import { User, GroceryList } from "../src/models";
import { listUsers } from "../src/graphql/queries";
import { API, graphqlOperation } from "aws-amplify";
import { Auth } from "aws-amplify";

export async function identifyUser(dispatch) {
  try {
    // if (navigator.onLine) {
      const currUser = await fetchUserOnline(dispatch);
  // }
    currUser && dispatch(authentificateUser(currUser));
    console.log("User info retrieved successfully!");
  } catch (error) {
    console.log("Error retrieving user info", error);
  }
}

export async function fetchUserOnline(dispatch) {
  try {
    const userInfo = await Auth.currentUserInfo();
    const { data } = await API.graphql(
      graphqlOperation(listUsers, {
        filter: {
          sub: {
            eq: userInfo.attributes.sub,
          },
        },
      })
    );
    if (data.listUsers.items[0]){
      console.log("User successfull retrieved!");
      return data.listUsers.items[0]
    }
    else{
      console.log("Creating a new user...");
      createUser(userInfo, dispatch)
    } 
  } catch (error) {
      console.log("Error fetching users online", error);
  }
}

export async function createUser(userInfo, dispatch) {
  try {
    const userDetails = {
      sub: userInfo.attributes.sub,
    };
    const newUser = await DataStore.save(new User(userDetails));
    // const newUser = await API.graphql({ query: mutations.createUser, variables: {input: userDetails}});
    dispatch(authentificateUser(newUser))
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
      const currentUser = await DataStore.query(User, (c) =>
        c.sub("eq", user.sub)
      );

      await DataStore.save(
        User.copyOf(currentUser[0], (updated) => {
          updated.userGroceryListID = updated.userGroceryListID.filter(
            (glistID) => glistID !== id
          );
        })
      );
      console.log("Grocery list deleted from User successfully!");
    } catch (err) {
      console.log("error deleting list", err);
    }
  }

  

  export async function fetchUserGroceryLists(dispatch, user) {
    try {
      const currentUser = await DataStore.query(User, (c) =>
        c.sub("eq", user.sub)
      );
      if (currentUser[0]){
        const userGroceryLists = (currentUser[0].userGroceryListID === undefined)? [] : currentUser[0].userGroceryListID;
        let groceryListsPerUser = []
        for (let id of userGroceryLists) {
          const groceryList = await DataStore.query(GroceryList, id);
          groceryListsPerUser.push(groceryList);
        }
        dispatch(loadGroceryLists(groceryListsPerUser));
        console.log("grocery lists retrieved successfully!");
      }
    } catch (error) {
      console.log("Error retrieving grocery lists", error);
    }
  }

  export async function addGroceryListToUser(groceryListID, user, dispatch) {
    try {
      const userGroceryLists = (user.userGroceryListID === undefined)? [] : user.userGroceryListID;
      userGroceryLists.push(groceryListID)
      await updateUserDetails(user, userGroceryLists)
      dispatch(addListToUser(groceryListID))
      console.log("Grocery list added to user successfully!");
    } catch (error) {
      console.log("Error adding grocery list to user", error);
    }
  }

  async function updateUserDetails(user, userGroceryLists){
     try{
       const currentUser = await DataStore.query(User, (c) =>
        c.sub("eq", user.sub)
      );
      await DataStore.save(
        User.copyOf(currentUser[0], (updated) => {
          updated.userGroceryListID = userGroceryLists
        })
      );
     } catch (error) {
      console.log("Error updating user details", error);
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
      User.copyOf(currentUser[0], (updated) => {
        updated.userGroceryListID = updated.userGroceryListID
          ? [...updated.userGroceryListID, groceryListSaved.id]
          : [groceryListSaved.id];
      })
    );

    console.log("List saved successfully!");
  } catch (err) {
    console.log("error creating list:", err);
  }
}