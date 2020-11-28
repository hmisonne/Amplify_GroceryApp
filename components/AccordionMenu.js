
import React from "react";
import {
    TouchableOpacity,
    StyleSheet
  } from "react-native";
  import { Ionicons } from '@expo/vector-icons'; 
  import { Subheading } from "react-native-paper";

const AccordionMenu = ({text, expanded, handlePress}) => {
    return(

        <TouchableOpacity
          onPress={handlePress}
          style={[styles.rowAligned, styles.spaceBetween]}
        >
          <Subheading >{text}</Subheading>
          <Ionicons
            name={
              expanded
                ? "ios-arrow-up"
                : "ios-arrow-down"
            }
            size={24}
            color="grey"
          />
        </TouchableOpacity>
    )
}

export default AccordionMenu

const styles = StyleSheet.create({
    rowAligned: {
      flexDirection: "row",
      marginLeft: 20,
    },
    spaceBetween: {
      justifyContent: "space-between",
    },

  });