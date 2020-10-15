
import { authentificateUser } from "../src/redux/actions/user";
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
    const userInfo = await Auth.currentUserInfo();
    let users = await DataStore.query(User, (c) =>
      c.sub("eq", userInfo.attributes.sub)
    );
    let currUser;
    // if no user in DS and online check, if user already created

    if (users.length === 0) {
      if (navigator.onLine) {
        currUser = await fetchUserOnline();
      }
      if (!navigator.onLine || !currUser) {
        console.log("creating new user");
        currUser = await DataStore.save(
          new User({
            sub: userInfo.attributes.sub,
            name: userInfo.username,
            email: userInfo.attributes.email,
          })
        );
      }
    } else {
      console.log("using user in DS");
      currUser = users[0];
    }
    dispatch(authentificateUser(currUser));
    console.log("User info retrieved successfully!");
  } catch (error) {
    console.log("Error retrieving user info", error);
  }
}

export async function fetchUserOnline() {
  console.log("fetchUserOnline");
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
  return data.listUsers.items[0];
}

export async function removeList(dispatch, user, id) {
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
    } catch (err) {
      console.log("error deleting list", err);
    }
  }

  export async function fetchLists(dispatch, user) {
    try {
      const currentUser = await DataStore.query(User, (c) =>
        c.sub("eq", user.sub)
      );
      
      let groceryListsPerUser = [];
      if (currentUser[0].userGroceryListID) {
        const data = currentUser[0].userGroceryListID;
        for (let GroceryListID of data) {
          const groceryList = await DataStore.query(GroceryList, GroceryListID);
          groceryListsPerUser.push(groceryList);
        }
      }
      dispatch(loadGroceryLists(groceryListsPerUser));
      console.log("grocery lists retrieved successfully!");
    } catch (error) {
      console.log("Error retrieving grocery lists", error);
    }
  }