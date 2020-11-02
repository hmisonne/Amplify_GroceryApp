import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { connect, useDispatch } from "react-redux";
import SubmitBtn from "../components/SubmitBtn";
import StyledTextInput from "../components/StyledTextInput";
import { handleAddGroceryList } from "../src/redux/actions/groceryList";



const JoinGroceryList = (props) => {
  const [groceryListID, setGroceryListID] = useState('');
  const dispatch = useDispatch();

  function addGroceryList() {
    dispatch(handleAddGroceryList(groceryListID))
    props.navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <StyledTextInput
        onChangeText={(val) => setGroceryListID(val)}
        style={styles.input}
        value={groceryListID}
        placeholder="Grocery List ID"
      />
      <SubmitBtn title="Join List" onPress={addGroceryList} />
    </View>
  );
};


export default connect()(JoinGroceryList);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    padding: 20,
  },
  input: { height: 50, backgroundColor: "#ddd", marginBottom: 10, padding: 8 },
});
