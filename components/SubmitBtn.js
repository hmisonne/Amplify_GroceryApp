import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { blue, grey } from "../utils/helpers";
import PropTypes from "prop-types";

export default function SubmitBtn({
  title,
  onPress,
  disabled = false,
  style = {},
}) {
  return (
    <TouchableOpacity
      style={
        disabled
          ? [styles.btn, style, { backgroundColor: "#c7c5bf" }]
          : [styles.btn, style]
      }
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.btnText}> {title} </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: blue,
    borderRadius: 10,
    marginTop: 10,
    paddingTop: 15,
    paddingBottom: 15,
    marginLeft: 100,
    marginRight: 100,
  },
  btnText: {
    color: "#fff",
    textAlign: "center",
  },
});

SubmitBtn.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  style: PropTypes.object,
  disabled: PropTypes.bool,
};
