import React from "react";
import { View, StyleSheet, Text } from "react-native";
import SubmitBtn from "../components/SubmitBtn";

const ShareGroceryList = (props) => {
  const { groceryListID } = props.route.params;
  function copyToClipBoard() {
    console.log(groceryListID);
  }
  return (
    <View style={styles.container}>
      <View>
      <View>
        <Text style={styles.text}>Send this reference to your friend :</Text>
      </View>
      <View>
        <Text style={styles.text}>{groceryListID}</Text>
      </View>
      </View>
      

      <SubmitBtn title="Share" onPress={copyToClipBoard} />
    </View>
  );
};

export default ShareGroceryList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    padding: 20,
  },
  text: {
    textAlign: "center",
  },
});
