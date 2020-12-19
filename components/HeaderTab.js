import * as React from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { secondaryColor, lightGrey, mainColor } from "../utils/helpers";
import PropTypes from "prop-types";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const HeaderTab = ({ firstTabSelected, switchToSecondTab }) => (
  <View style={styles.rowAligned}>
    <TouchableOpacity
      style={firstTabSelected ? styles.selectedTab : styles.unSelectedTab}
      disabled={firstTabSelected}
      onPress={() => switchToSecondTab(true)}
    >
      <MaterialCommunityIcons
        name="cart"
        size={20}
        color={firstTabSelected ? secondaryColor : lightGrey}
        style={{ alignSelf: "center" }}
      />
      <Text
        style={{
          textAlign: "center",
          color: firstTabSelected ? secondaryColor : lightGrey,
        }}
      >
        MY LIST
      </Text>
    </TouchableOpacity>

    {/* <View
      style={{
        height: 40,
        width: 0.8,
        backgroundColor: lightGrey,
      }}
    /> */}

    <TouchableOpacity
      style={!firstTabSelected ? styles.selectedTab : styles.unSelectedTab}
      disabled={!firstTabSelected}
      onPress={() => switchToSecondTab(false)}
    >
      <MaterialCommunityIcons
        name="history"
        size={20}
        color={firstTabSelected ? lightGrey : secondaryColor}
        style={{ alignSelf: "center" }}
      />
      <Text
        style={{
          textAlign: "center",
          color: firstTabSelected ? lightGrey : secondaryColor,
        }}
      >
        HISTORY
      </Text>
    </TouchableOpacity>
  </View>
);

export default HeaderTab;

const styles = StyleSheet.create({
  rowAligned: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  selectedTab: {
    paddingBottom: 8,
    paddingTop: 8,
    flex: 1,
    borderBottomColor: mainColor,
    borderBottomWidth: 2,
  },
  unSelectedTab: {
    paddingBottom: 8,
    paddingTop: 8,
    flex: 1,
    backgroundColor: "#F1F1F0",
  },
});

HeaderTab.propTypes = {
  firstTabSelected: PropTypes.bool.isRequired,
  switchToSecondTab: PropTypes.func.isRequired,
};
