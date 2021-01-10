import React from "react";
import { View, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { connect } from "react-redux";
import { Auth } from "@aws-amplify/auth";
import { DataStore } from "aws-amplify";
import * as MailComposer from "expo-mail-composer";
import { Divider, List } from "react-native-paper";
import * as Linking from 'expo-linking';
import { onShare } from "../utils/helpers";

const Settings = ({ user }) => {
  const androidURL = "https://play.google.com/store/apps/details?id=com.hmisonne.ListBee"
  const iosURL = "https://apps.apple.com/us/app/listbee-grocery-shopping-list/id1542615662"
  const shareText = `ListBee | A Grocery List App, Android: ${androidURL}, iOS: ${iosURL}`
  async function signOut() {
    try {
      await DataStore.clear();
      await Auth.signOut();
    } catch (error) {
      console.log("error signing out: ", error);
    }
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const formattedUsername = capitalizeFirstLetter(user.username);
  const mailComposerOptions = {
    isHtml: true,
    recipients: ["listbee.app@gmail.com"],
    subject: `ListBee: ${formattedUsername}'s feedback`,
  };
  function sendFeedback() {
    MailComposer.composeAsync(mailComposerOptions);
  }
  const requestReview = async () => {
    let url = ''
    Platform.OS === 'android' 
    ? url = androidURL
    : url = iosURL
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
     Alert.alert(`This link is not accessible: ${url}`);
    }
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={signOut}>
        <List.Item
          title="Sign Out"
          left={(props) => <List.Icon {...props} icon="logout" />}
        />
      </TouchableOpacity>
      <Divider/>
      <TouchableOpacity onPress={() => onShare(shareText)}>
        <List.Item
          title="Share the App"
          left={(props) => <List.Icon {...props} icon="share-variant" />}
        />
      </TouchableOpacity>
      <Divider/>
      <TouchableOpacity onPress={sendFeedback}>
        <List.Item
          title="Send Feedback"
          left={(props) => <List.Icon {...props} icon="mail" />}
        />
      </TouchableOpacity>
      <Divider/>
      <TouchableOpacity onPress={requestReview}>
      <List.Item
        title={Platform.OS === 'android' ? "Rate on Google Play" : "Rate on App Store" }
        left={(props) => <List.Icon {...props} icon="star" />}
      />
    </TouchableOpacity>
    
    </View>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(Settings);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});
