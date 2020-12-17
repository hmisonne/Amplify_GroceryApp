import * as React from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { secondaryColor, lightGrey, mainColor } from "../utils/helpers";
import PropTypes from "prop-types";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const HeaderTab = ({ firstTabSelected, switchToSecondTab }) => (
  <View style={styles.rowAligned}>
    <TouchableOpacity
      style={firstTabSelected && styles.bottomLine}
      disabled={firstTabSelected}
      onPress={() => switchToSecondTab(true)}
    >
      <MaterialCommunityIcons
        name="cart"
        size={20}
        color={firstTabSelected ? secondaryColor : lightGrey}
        style={{ alignSelf: "center" }}
      />
      <Text style={{ color: firstTabSelected ? secondaryColor : lightGrey }}>
        MY CART
      </Text>
    </TouchableOpacity>

    <View
      style={{
        height: 40,
        width: 0.8,
        backgroundColor: lightGrey,
      }}
    />

    <TouchableOpacity
      style={!firstTabSelected && styles.bottomLine}
      disabled={!firstTabSelected}
      onPress={() => switchToSecondTab(false)}
    >
      <MaterialCommunityIcons
        name="history"
        size={20}
        color={firstTabSelected ? lightGrey : secondaryColor}
        style={{ alignSelf: "center" }}
      />
      <Text style={{ color: firstTabSelected ? lightGrey : secondaryColor }}>
        HISTORY
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

HeaderTab.propTypes = {
  firstTabSelected: PropTypes.bool.isRequired,
  switchToSecondTab: PropTypes.func.isRequired,
};
