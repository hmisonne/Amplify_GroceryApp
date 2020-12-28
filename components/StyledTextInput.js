import React from "react";
import PropTypes from "prop-types";
import { TextInput } from 'react-native-paper';

export default function StyledTextInput({ value, placeholder, onChangeText, label }) {
  return (
    <TextInput
      label={label}
      mode="outlined"
      onChangeText={onChangeText}
      value={value}
      placeholder={placeholder}
      testID="TextInput"
    />
  );
}


StyledTextInput.propTypes = {
  onChangeText: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
};
