import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { connect, useDispatch } from "react-redux";
import { HelperText, Button } from "react-native-paper";
import StyledTextInput from "../components/StyledTextInput";
import {
  handleAddGroceryList,
  handleLoadGroceryLists,
} from "../src/redux/actions/groceryList";
import { Hub } from "aws-amplify";
import * as queries from "../src/graphql/queries";
import { API } from "aws-amplify";

const JoinGroceryList = ({ navigation, userGroceryLists }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions(
      {
        headerRight: () => (
          <Button
            mode="contained"
            onPress={addGroceryList}
            disabled={validateForm()}
            style={{ marginRight: 15 }}
          >
            Join
          </Button>
        ),
      },
      [addGroceryList, validateForm]
    );
  });
  const validateForm = () => {
    return groceryListID.length !== 36;
  };
  const [groceryListID, setGroceryListID] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertText, setAlertText] = useState("");

  const dispatch = useDispatch();

  async function addGroceryList() {
    // Check if user has already access to the grocery list:
    if (userGroceryLists && userGroceryLists.includes(groceryListID)) {
      setAlertText("This Grocery List has already been added");
      return setAlertVisible(true);
    }
    // Check if grocerylist exists:
    const validityCheck = await API.graphql({
      query: queries.getGroceryList,
      variables: { id: groceryListID },
    });
    if (!validityCheck.data.getGroceryList) {
      setAlertText("Please enter a valid Grocery List ID");
      setAlertVisible(true);
    } else {
      dispatch(handleAddGroceryList(groceryListID));
      const removeListener = Hub.listen("datastore", async (hubData) => {
        const { event, data } = hubData.payload;
        if (event === "ready") {
          console.log("Ready load grocery list JOIN");
          dispatch(handleLoadGroceryLists());
          removeListener();
        }
      });
      navigation.goBack();
    }
  }

  function setInput(value) {
    setGroceryListID(value);
    if (value.length !== 36) {
      setAlertText("Incorrect number of character");
      return setAlertVisible(true);
    } else {
      setAlertVisible(false);
    }
  }
  return (
    <View style={styles.container}>
      <Text>
        Ask your friend to share the grocery list you would like to join. Then
        copy-paste the List ID below!
      </Text>

      <View style={styles.centered}>
        <StyledTextInput
          onChangeText={(val) => setInput(val)}
          style={styles.input}
          value={groceryListID}
          placeholder="List ID number"
          label="List ID number"
        />
        <HelperText
          type="error"
          visible={alertVisible}
          style={{ textAlign: "center" }}
        >
          {alertText}
        </HelperText>
      </View>
    </View>
  );
};
const mapStateToProps = (state) => ({
  userGroceryLists: state.user.groceryLists,
});

export default connect(mapStateToProps)(JoinGroceryList);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  centered: {
    marginTop: 20,
  },
  input: { height: 50, backgroundColor: "#ddd", marginBottom: 10, padding: 8 },
});
