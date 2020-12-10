import React from "react";
import { View, Share, StyleSheet, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { Auth } from "@aws-amplify/auth";
import { DataStore } from "aws-amplify";
import * as MailComposer from "expo-mail-composer";
import { Divider, List } from "react-native-paper";

import SubmitBtn from "../components/SubmitBtn";

const Settings = ({ user }) => {
  async function signOut() {
    try {
      await DataStore.clear();
      await Auth.signOut();
    } catch (error) {
      console.log("error signing out: ", error);
    }
  }
  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          "ListBee | A Grocery List App, Android: https://play.google.com/store/apps/details?id=com.hmisonne.ListBee, iOS TestFlight: https://testflight.apple.com/join/xM3anK5Q",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const formattedUsername = capitalizeFirstLetter(user.username);
  const mailComposerOptions = {
    isHtml: true,
    recipients: ["listbee.app@gmail.com "],
    subject: `ListBee: ${formattedUsername}'s feedback`,
  };
  function sendFeedback() {
    MailComposer.composeAsync(mailComposerOptions);
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
      <TouchableOpacity onPress={onShare}>
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
