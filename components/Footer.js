import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import {  mainColor, lightGreyBackground } from "../utils/helpers";
import PropTypes from "prop-types";
import { FAB } from "react-native-paper";

const Footer = ({ numOfProducts, onPressAction }) => (
    <View style={styles.footer}>
    <View
      style={{
        alignSelf: "center",
      }}
    >
      <Text>
        {numOfProducts.toBuy
          ? `Items in cart: ${numOfProducts.inCart}/${numOfProducts.toBuy}`
          : ""}
      </Text>
    </View>

    <FAB
      icon="plus"
      style={{
        backgroundColor: mainColor,
        alignSelf: "center",
      }}
      onPress={onPressAction}
    />
  </View>
);

export default Footer;

const styles = StyleSheet.create({
    footer: {
      height: 80,
      backgroundColor: lightGreyBackground,
      borderTopWidth: 1,
      borderTopColor: "#DCDCDC",
      flexDirection: "row",
      justifyContent: "space-between",
      padding: 15,
    },
  });

  Footer.propTypes = {
    numOfProducts: PropTypes.object.isRequired,
    onPressAction: PropTypes.func.isRequired,
  };