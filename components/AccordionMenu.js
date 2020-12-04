import React from "react";
import { TouchableOpacity , StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Subheading, Text } from "react-native-paper";
import PropTypes from "prop-types";

const AccordionMenu = ({ text, expanded, handlePress }) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[styles.rowAligned, styles.spaceBetween]}
    >
      <Text>{text}</Text>
      <Ionicons
        name={expanded ? "ios-arrow-up" : "ios-arrow-down"}
        size={24}
        color="grey"
      />
    </TouchableOpacity>
  );
};

export default AccordionMenu;

const styles = StyleSheet.create({
  rowAligned: {
    flexDirection: "row",
    marginLeft: 20,
  },
  spaceBetween: {
    justifyContent: "space-between",
  },
});

AccordionMenu.propTypes = {
  text: PropTypes.string.isRequired,
  expanded: PropTypes.bool.isRequired,
  handlePress: PropTypes.func.isRequired,
};
