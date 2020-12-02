import React from "react";
import { View, StyleSheet, Text } from "react-native";
import * as MailComposer from "expo-mail-composer";
import SubmitBtn from "../components/SubmitBtn";
import { connect } from "react-redux";

const ShareGroceryList = (props) => {
  const { user } = props;
  const { groceryList } = props.route.params;
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const formattedUsername = capitalizeFirstLetter(user.username)
  const formattedGroceryList = capitalizeFirstLetter(groceryList.name)
  const mailComposerOptions = {
    isHtml: true,
    subject: `ListBee: ${formattedUsername} wants to share a Grocery List with you !`,
    body: 
    `<div>Welcome to ListBee!</div> 
    
    <div>${formattedUsername} is giving you access to his/her ${formattedGroceryList} list.</div>

    <div>If you don't have the app, here is the link to download it the Android App Store:
    https://play.google.com/store/apps/details?id=com.hmisonne.ListBee, </div>
    
    <div>Or download the IOS Version on TestFlight: 
    https://testflight.apple.com/join/xM3anK5Q</div>
    
    <div>After signing-up, click on the + button to "join a Grocery List" and paste this number:</div>

    <div>${groceryList.id}</div>
    
    <div>You are ready to start shopping!</div>
    `,
  };
  function shareList() {
    MailComposer.composeAsync(mailComposerOptions);
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}> To share your list, use this reference :</Text>
      <Text style={styles.ref}>{groceryList.id}</Text>
      <SubmitBtn title="Send an email" onPress={shareList} />
    </View>
  );
};
const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(ShareGroceryList);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    padding: 20,
  },
  text: {
    textAlign: "center",
  },
  ref: {
    textAlign: "center",
    fontWeight: "bold",
  },
});
