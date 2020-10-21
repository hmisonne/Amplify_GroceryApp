import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import SubmitBtn from "../components/SubmitBtn";
import { identifyUser } from '../utils/api'


const Home = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    identifyUser(dispatch);
    // const subscription = DataStore.observe(User).subscribe((msg) => {
    //   console.log("sync users", msg.model, msg.opType, msg.element);
    //   identifyUser(dispatch);
    // });

    // return () => subscription.unsubscribe();
  }, []);




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
      <SubmitBtn title="Saved List(s)" onPress={goToSavedGroceryList} />
      <SubmitBtn title="New List" onPress={goToNewGroceryList} />
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
