import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import SubmitBtn from "../components/SubmitBtn";
import StyledTextInput from "../components/StyledTextInput";
import store from "../src/redux/store";
import { createNewGroceryList } from '../utils/api'

const initialState = {
  name: "",
  description: "",
};

const NewGroceryListForm = (props) => {
  const [formState, setFormState] = useState(initialState);
  const { user } = store.getState();

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value });
  }

  function createListHandler() {
    const groceryList = { ...formState };
    createNewGroceryList(groceryList,user )
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
        placeholder="Description"
      />
      <SubmitBtn title="Add to List" onPress={createListHandler} />
    </View>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(NewGroceryListForm);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    padding: 20,
  },
  input: { height: 50, backgroundColor: "#ddd", marginBottom: 10, padding: 8 },
});
