import React from "react";
import { TextInput, StyleSheet } from "react-native";
import { grey } from "../utils/colors";
import PropTypes from "prop-types";

export default function StyledTextInput({ value, placeholder, onChangeText }) {
  return (
    <TextInput
      style={styles.textInput}
      onChangeText={onChangeText}
      value={value}
      placeholder={placeholder}
    />
  );
}

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    borderColor: grey,
    borderWidth: 2,
    borderRadius: 10,
    paddingLeft: 15,
    marginTop: 10,
    marginLeft: 30,
    marginRight: 30,
  },
});

StyledTextInput.propTypes = {
  onChangeText: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
};
