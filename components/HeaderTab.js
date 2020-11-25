import * as React from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { secondaryColor, lightGrey, mainColor } from "../utils/helpers";

const HeaderTab = ({ firstTabSelected, switchToSecondTab }) => (
  <View style={styles.rowAligned}>
    <TouchableOpacity
      style={firstTabSelected && styles.bottomLine}
      disabled={firstTabSelected}
      onPress={() => switchToSecondTab(true)}
    >
      <Text style={{ color: firstTabSelected ? secondaryColor : lightGrey }}>
        TO BUY
      </Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={!firstTabSelected && styles.bottomLine}
      disabled={!firstTabSelected}
      onPress={() => switchToSecondTab(false)}
    >
      <Text style={{ color: firstTabSelected ? lightGrey: secondaryColor }}>
        ALL
      </Text>
    </TouchableOpacity>
  </View>
);

export default HeaderTab;

const styles = StyleSheet.create({
  rowAligned: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
    marginTop: 10,
  },
  bottomLine: {
    borderBottomColor: mainColor,
    borderBottomWidth: 2,
  },
});
