import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { connect, useDispatch } from "react-redux";
import SubmitBtn from "../components/SubmitBtn";
import StyledTextInput from "../components/StyledTextInput";
import { handleCreateGroceryList, handleLoadGroceryLists } from "../src/redux/actions/groceryList";
import { Hub } from 'aws-amplify'

const initialState = {
  name: "",
  description: "",
};

const NewGroceryListForm = (props) => {
  const [formState, setFormState] = useState(initialState);
  const dispatch = useDispatch();
  function setInput(key, value) {
    setFormState({ ...formState, [key]: value });
  }

  async function createGroceryList() {
    const groceryList = { ...formState };
    dispatch(handleCreateGroceryList(groceryList))
    const removeListener =
    Hub.listen("datastore", async (hubData) => {
      const { event, data } = hubData.payload;
      if ( event === "ready") {
        console.log("Ready load grocery list NEW");
        dispatch(handleLoadGroceryLists());
        removeListener();
      }
    });
    props.navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <StyledTextInput
        onChangeText={(val) => setInput("name", val)}
        style={styles.input}
        value={formState.name}
        label="Name"
        placeholder="My List"
      />
      <StyledTextInput
        onChangeText={(val) => setInput("description", val)}
        style={styles.input}
        value={formState.description}
        label="Description (optional)"
        placeholder="Weekly recurring"
      />
      <SubmitBtn title="Create" onPress={createGroceryList} />
    </View>
  );
};


export default connect()(NewGroceryListForm);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    padding: 20,
  },
  input: { height: 50, backgroundColor: "#ddd", marginBottom: 10, padding: 8 },
});
