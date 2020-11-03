import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import * as MailComposer from 'expo-mail-composer';
import SubmitBtn from "../components/SubmitBtn";
import { Auth } from "aws-amplify";
import { connect } from "react-redux";
// import { Auth } from '@aws-amplify/auth'
     
const ShareGroceryList = (props) => {
  const { user } = props;
  // const [userState, setUserState] = useState('')
  // useEffect(() => {
  //     fetchUserInfo()
  //   }
  // );
  // async function fetchUserInfo() {
  //   const userInfo = await Auth.currentUserInfo();
  //   console.log(userInfo)
  //   setUserState(userInfo)
  // }
  const { groceryListID } = props.route.params;

  const mailComposerOptions = {
    isHtml: true,
    subject: `ListBee: ${user.username} wants to share a Grocery List with you !`,
    body: `<div> Welcome to ListBee!</div> 
    
    If you don't have the app go to the Android App Store:
    https://play.google.com/store/apps/details?id=com.hmisonne.ListBee, 
    
    Or go to the website: https://master.d22bl963x1qfmv.amplifyapp.com/
    
    After signing-up, click on the + button to join a Grocery List and paste this number:
    ${groceryListID}`
  }
  function shareList() {
    MailComposer.composeAsync(mailComposerOptions)
  }
  return (
    <View style={styles.container}>
      <View>
      <View>
        <Text style={styles.text}> To share your list, use this reference :</Text>
      </View>
      <View>
        <Text style={styles.text}>{groceryListID}</Text>
      </View>
      </View>
      <SubmitBtn title="Send an email" onPress={shareList}/>
      
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
});
