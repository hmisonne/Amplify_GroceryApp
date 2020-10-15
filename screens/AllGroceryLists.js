import React, { useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { connect } from "react-redux";
import { DataStore } from "@aws-amplify/datastore";
import { User } from "../src/models";
import store from "../src/redux/store";

const AllGroceryLists = (props) => {
  const { groceryLists, user } = store.getState();

  async function addListToUser(groceryListID) {
    const currentUser = await DataStore.query(User, (c) =>
      c.sub("eq", user.sub)
    );

    await DataStore.save(
      User.copyOf(currentUser[0], (updated) => {
        updated.userGroceryListID = updated.userGroceryListID
          ? [...updated.userGroceryListID, groceryListID]
          : [groceryListID];
      })
    );
  }


  return (
    <View style={styles.container}>
      {groceryLists.map((list, index) => (
        <View key={list.id ? list.id : index} style={styles.list}>
          <Text style={styles.listName}>{list.name}</Text>
          <Button title="Add" onPress={() => addListToUser(list.id)} />
        </View>
      ))}
    </View>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  groceryLists: state.groceryLists,
});

export default connect(mapStateToProps)(AllGroceryLists);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  list: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  listName: { fontSize: 18 },
});
