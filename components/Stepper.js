import React from "react";
import { View, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { blue, white, grey, mainColor, secondaryColor } from "../utils/helpers";

export default function Stepper({ onIncrement, onDecrement }) {
  return (
    <View style={[styles.row, { justifyContent: "space-between" }]}>
      {Platform.OS === "ios" ? (
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={[
              styles.iosBtn,
              { borderTopRightRadius: 0, borderBottomRightRadius: 0 },
            ]}
            onPress={onDecrement}
          >
            <MaterialCommunityIcons name="minus" size={30} color={mainColor} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.iosBtn,
              {
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                borderLeftWidth: 0,
              },
            ]}
            onPress={onIncrement}
          >
            <MaterialCommunityIcons name="plus" size={30} color={mainColor} />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={styles.androidBtn} onPress={onDecrement}>
            <MaterialCommunityIcons name="minus" size={30} color={secondaryColor} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.androidBtn} onPress={onIncrement}>
            <MaterialCommunityIcons name="plus" size={30} color={secondaryColor} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  androidBtn: {
    margin: 5,
    backgroundColor: mainColor,
    padding: 10,
    borderRadius: 10,
  },
  iosBtn: {
    backgroundColor: mainColor,
    borderColor: mainColor,
    borderWidth: 1,
    borderRadius: 3,
    padding: 5,
    paddingLeft: 25,
    paddingRight: 25,
  },
});
