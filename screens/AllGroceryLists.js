import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { connect } from "react-redux";
import { DataStore } from "@aws-amplify/datastore";
import { User, GroceryList } from "../src/models";
import store from "../src/redux/store";

const AllGroceryLists = (props) => {
  const { user } = store.getState();
  const [groceryListsState, setGlistState] = useState([]);

  useEffect(() => {
    fetchLists();
  }, []);

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

  async function fetchLists() {
    try {
      const allGroceryLists = await DataStore.query(GroceryList);
      setGlistState(allGroceryLists);
      console.log("grocery lists retrieved successfully!");
    } catch (error) {
      console.log("Error retrieving grocery lists", error);
    }
  }

  return (
    <View style={styles.container}>
      {groceryListsState.map((list, index) => (
        <View key={list.id ? list.id : index} style={styles.list}>
          <Text style={styles.listName}>{list.name}</Text>
          <Button title="Add" onPress={() => addListToUser(list.id)} disabled={user.userGroceryListID && user.userGroceryListID.includes(list.id)} />
        </View>
      ))}
    </View>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
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
