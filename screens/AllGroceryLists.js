import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { connect, useDispatch } from "react-redux";
import store from "../src/redux/store";
import { addGroceryListToUser, fetchAllGroceryLists } from '../utils/api'

const AllGroceryLists = (props) => {
  const dispatch = useDispatch();
  const { user } = store.getState();
  const [groceryListsState, setGlistState] = useState([]);
  useEffect(() => {
    fetchAllGroceryLists(setGlistState);
  }, []);




  return (
    <View style={styles.container}>
      {groceryListsState.map((list, index) => (
        <View key={list.id ? list.id : index} style={styles.list}>
          <Text style={styles.listName}>{list.name}</Text>
          <Button title="Add" onPress={() => addGroceryListToUser(list.id, user, dispatch)} />
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
