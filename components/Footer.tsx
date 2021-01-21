import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import { mainColor, lightGreyBackground } from "../utils/helpers";
import { FAB } from "react-native-paper";


interface Props {
  numOfProducts: {
    toBuy: number;
    inCart: number;
  };
  onPressAction: () => void;
}

const Footer: React.FC<Props> = ({ numOfProducts, onPressAction }) => (
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
