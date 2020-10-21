
import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const LoadingScreen = (props) => {
    return(
        <View style={styles.container}>
            <Text style={styles.text}> Welcome back ! </Text>
            <MaterialCommunityIcons name="bee-flower" size={100} color="black" />
        </View>
    )
}

export default LoadingScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "space-around",
      alignItems: "center",
      backgroundColor: "#ecf0f1",
    },
    text: {
        fontSize: 18,
    },
  });