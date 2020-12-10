import React, { useState } from "react";
import {
  View,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Text,
  Platform,
  TouchableWithoutFeedback,
  Button,
  Keyboard,
} from "react-native";
import { connect, useDispatch } from "react-redux";
import SubmitBtn from "../components/SubmitBtn";
import StyledTextInput from "../components/StyledTextInput";
import {
  handleCreateGroceryList,
  handleLoadGroceryLists,
  handleUpdateGroceryList,
} from "../src/redux/actions/groceryList";
import { Hub } from "aws-amplify";

const initialState = {
  name: "",
};

const NewGroceryListForm = (props) => {
  const glistToUpdate = props.route.params.groceryList;
  const [formState, setFormState] = useState(
    glistToUpdate ? glistToUpdate : initialState
  );
  const dispatch = useDispatch();
  function setInput(key, value) {
    setFormState({ ...formState, [key]: value });
  }
  const validateForm = () => {
    return formState.name === "";
  };
  async function updateGroceryList() {
    const groceryList = { ...formState };
    dispatch(handleUpdateGroceryList(groceryList));
    props.navigation.goBack();
  }
  
  async function createGroceryList() {
    const groceryList = { ...formState };
    dispatch(handleCreateGroceryList(groceryList));
    const removeListener = Hub.listen("datastore", async (hubData) => {
      const { event, data } = hubData.payload;
      if (event === "ready") {
        console.log("Ready load grocery list NEW");
        dispatch(handleLoadGroceryLists());
        removeListener();
      }
    });
    props.navigation.goBack();
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <StyledTextInput
            onChangeText={(val) => setInput("name", val)}
            style={styles.input}
            value={formState.name}
            label="List Name"
            placeholder="My List"
          />
           <View>
          {glistToUpdate ? (
            <SubmitBtn title="Update" onPress={updateGroceryList} disabled={validateForm()}/>
          ) : (
            <SubmitBtn title="Create List" onPress={createGroceryList} disabled={validateForm()}/>
          )}
        </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
