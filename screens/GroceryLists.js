import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { connect, useDispatch } from "react-redux";
import store from "../src/redux/store";
import RoundButton from "../components/RoundButton";
import { removeGroceryListFromUser, fetchUserGroceryLists } from '../utils/api'
import { DataStore } from "@aws-amplify/datastore";
import { GroceryList } from "../src/models";

const GroceryLists = (props) => {
  const dispatch = useDispatch();
  const { groceryLists, user } = store.getState();
  useEffect(() => {
    fetchUserGroceryLists(dispatch, user);
    // const subscription = DataStore.observe(GroceryList).subscribe((msg) => {
    //   console.log("sync grocery list", msg.model, msg.opType, msg.element);
    //   fetchUserGroceryLists(dispatch, user);
    // });
    // return () => subscription.unsubscribe();
  }, []);

  function goToList(groceryList) {
    return props.navigation.push("ProductCategory", { groceryList });
  }
  

  return (
    <View style={styles.container}>
      {groceryLists.map((glist, index) => (
        <View style={styles.glist} key={glist.id ? glist.id : index}>
          <TouchableOpacity
            style={styles.product}
            onPress={() => goToList(glist)}
          >
            <View style={styles.subContainer}>
              <Text style={styles.glistName}>{glist.name}</Text>
            </View>
          </TouchableOpacity>
          <RoundButton
            onPress={() => removeGroceryListFromUser(glist.id, user, dispatch)}
            name="minus-circle"
            color="red"
          />
        </View>
      ))}
    </View>
  );
};
const mapStateToProps = (state) => ({
  groceryLists: state.groceryLists,
});

export default connect(mapStateToProps)(GroceryLists);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  glist: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  glistName: { fontSize: 18 },
});
