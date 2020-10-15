import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import SubmitBtn from "../components/SubmitBtn";
import { authentificateUser } from "../src/redux/actions/user";
import { Auth } from "aws-amplify";
import { DataStore } from "@aws-amplify/datastore";
import { User } from "../src/models";
import { listUsers } from "../src/graphql/queries";
import { API, graphqlOperation } from "aws-amplify";

const Home = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    identifyUser();
    const subscription = DataStore.observe(User).subscribe((msg) => {
      console.log(msg.model, msg.opType, msg.element);
      identifyUser();
    });

    return () => subscription.unsubscribe();
  }, []);

  async function fetchUserOnline() {
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
    console.log("data", data);
    return data.listUsers.items[0];
  }
  async function identifyUser() {
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

  function goToAllGroceryList() {
    return props.navigation.push("AllGroceryLists");
  }
  function goToNewGroceryList() {
    return props.navigation.push("NewList");
  }

  function goToSavedGroceryList() {
    return props.navigation.push("GroceryLists");
  }

  return (
    <View style={styles.container}>
      <SubmitBtn title="New List" onPress={goToNewGroceryList} />
      <SubmitBtn title="Saved List(s)" onPress={goToSavedGroceryList} />
      <SubmitBtn title="Browse Lists" onPress={goToAllGroceryList} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    padding: 20,
  },
});
