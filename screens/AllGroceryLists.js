import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { connect, useDispatch } from "react-redux";
import { addGroceryListHandler } from "../src/redux/actions/groceryList";
import { fetchAllGroceryLists } from '../utils/api'
import { blue } from "../utils/colors";

const AllGroceryLists = (props) => {
  const dispatch = useDispatch();
  const { user } = props
  const [groceryListsState, setGlistState] = useState([]);
  useEffect(() => {
    fetchAllGroceryLists()
    .then((groceryLists)=> setGlistState(groceryLists))
  }, []);
  
  function addGroceryList(groceryListid) {
    dispatch(addGroceryListHandler(groceryListid))
  }

  return (
    <View style={styles.container}>
      {groceryListsState.map((list, index) => (
        <View key={list.id ? list.id : index} style={styles.list}>
          <Text style={styles.listName}>{list.name}</Text>
          <Button title="Add" color={blue} onPress={() => addGroceryList(list.id)} disabled={user.groceryLists.includes(list.id)} />
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
