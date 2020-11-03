import React from "react";
import { View, StyleSheet } from "react-native";
import SubmitBtn from "../components/SubmitBtn";
import { Auth } from '@aws-amplify/auth'
import { DataStore } from '@aws-amplify/datastore'

const Settings = () => {
  async function signOut() {
    try {
      await DataStore.clear();
      await Auth.signOut();
    } catch (error) {
        console.log('error signing out: ', error);
    }
}

  return (
    <View style={styles.container}>
      <SubmitBtn title="SignOut" onPress={signOut} />
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    padding: 20,
  },
});
