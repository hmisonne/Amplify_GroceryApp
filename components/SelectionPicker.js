import React from "react";
import { StyleSheet, Picker } from "react-native";
import { grey } from "../utils/helpers";
import PropTypes from "prop-types";

export default function SelectionPicker({
  selectedValue,
  onValueChange,
  value,
  selection,
}) {
  return (
    <Picker
      selectedValue={selectedValue}
      style={styles.picker}
      onValueChange={onValueChange}
    >
      <Picker.Item label={value} value={value} />
      {selection
        .filter((element) => element !== value)
        .map((element) => (
          <Picker.Item label={element} value={element} key={element} />
        ))}
    </Picker>
  );
}

const styles = StyleSheet.create({
  picker: {
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

SelectionPicker.propTypes = {
  selectedValue: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  selection: PropTypes.array.isRequired,
};
