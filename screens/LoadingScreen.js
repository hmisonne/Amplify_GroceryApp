
import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { blueGreen, mainColor, secondaryColor } from "../utils/helpers";
import LoadingCircle from "../components/LoadingCircle";

const LoadingScreen = () => {
    return(
        <View style={styles.container}>
            <Text style={styles.text}> ListBee </Text>
            <LoadingCircle/>
            <MaterialCommunityIcons name="bee-flower" size={100} color={mainColor} />
        </View>
    )
}

export default LoadingScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "space-around",
      alignItems: "center",
      backgroundColor: secondaryColor,
    },
    text: {
        fontSize: 50,
        color: mainColor,
    },
  });