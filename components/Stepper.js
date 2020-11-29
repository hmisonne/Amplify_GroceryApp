import React from "react";
import { View, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { blue, white, grey, mainColor, secondaryColor } from "../utils/helpers";
import PropTypes from "prop-types";

export default function Stepper({ onIncrement, onDecrement }) {
  return (
    <View style={[styles.row, { justifyContent: "space-between" }]}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={styles.androidBtn} onPress={onDecrement}>
            <MaterialCommunityIcons name="minus" size={30} color={secondaryColor} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.androidBtn} onPress={onIncrement}>
            <MaterialCommunityIcons name="plus" size={30} color={secondaryColor} />
          </TouchableOpacity>
        </View>
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
});

Stepper.propTypes = {
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
};
