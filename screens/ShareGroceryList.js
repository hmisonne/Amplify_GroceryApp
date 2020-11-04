import React from "react";
import { View, StyleSheet, Text } from "react-native";
import * as MailComposer from "expo-mail-composer";
import SubmitBtn from "../components/SubmitBtn";
import { connect } from "react-redux";

const ShareGroceryList = (props) => {
  const { user } = props;
  const { groceryListID } = props.route.params;

  const mailComposerOptions = {
    isHtml: true,
    subject: `ListBee: ${user.username} wants to share a Grocery List with you !`,
    body: `Welcome to ListBee! 
    
    If you don't have the app go to the Android App Store:
    https://play.google.com/store/apps/details?id=com.hmisonne.ListBee, 
    
    Or go to the website: https://master.d22bl963x1qfmv.amplifyapp.com/
    
    After signing-up, click on the + button to join a Grocery List and paste this number:

    ${groceryListID}
    
    You are ready to start shopping!
    `,
  };
  function shareList() {
    MailComposer.composeAsync(mailComposerOptions);
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}> To share your list, use this reference :</Text>
      <Text style={styles.ref}>{groceryListID}</Text>
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
