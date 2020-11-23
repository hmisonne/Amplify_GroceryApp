import * as React from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { secondaryColor, lightGrey, mainColor } from "../utils/helpers";

const HeaderButtons = ({ visibleProducts, toggleProducts }) => (
  <View style={styles.rowAligned}>
    <TouchableOpacity
      style={!visibleProducts && styles.bottomLine}
      disabled={!visibleProducts}
      onPress={() => toggleProducts(false)}
    >
      <Text style={{ color: visibleProducts ? lightGrey : secondaryColor }}>
        TO BUY
      </Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={visibleProducts && styles.bottomLine}
      disabled={visibleProducts}
      onPress={() => toggleProducts(true)}
    >
      <Text style={{ color: visibleProducts ? secondaryColor : lightGrey }}>
        ALL
      </Text>
    </TouchableOpacity>
  </View>
);

export default HeaderButtons;

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
