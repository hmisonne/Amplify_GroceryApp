
import { authentificateUser } from "../src/redux/actions/user";
import { DataStore } from "@aws-amplify/datastore";
import { User } from "../src/models";
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