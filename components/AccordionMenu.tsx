import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  text: string;
  expanded: boolean;
  handlePress: () => void;
}

const AccordionMenu: React.FC<Props> = ({ text, expanded, handlePress }) => {
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
  },
  spaceBetween: {
    justifyContent: "space-between",
  },
});
