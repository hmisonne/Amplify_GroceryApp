import React from "react";
import {Picker} from '@react-native-picker/picker';
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
        onValueChange={onValueChange}
        itemStyle={{ fontSize:16 }}
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


SelectionPicker.propTypes = {
  selectedValue: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  selection: PropTypes.array.isRequired,
};
