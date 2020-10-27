import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { connect, useDispatch } from "react-redux";
import SubmitBtn from "../components/SubmitBtn";
import StyledTextInput from "../components/StyledTextInput";
import { handleCreateGroceryList } from "../src/redux/actions/groceryList";

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
    props.navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <StyledTextInput
        onChangeText={(val) => setInput("name", val)}
        style={styles.input}
        value={formState.name}
        placeholder="Name"
      />
      <StyledTextInput
        onChangeText={(val) => setInput("description", val)}
        style={styles.input}
        value={formState.description}
        placeholder="Description (optional)"
      />
      <SubmitBtn title="Add to List" onPress={createGroceryList} />
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
