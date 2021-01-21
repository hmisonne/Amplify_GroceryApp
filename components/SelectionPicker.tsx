import React from "react";
import { Picker } from '@react-native-picker/picker';


interface Props {
  selectedValue: string;
  onValueChange: () => void;
  value: string;
  selection: string[];
}

const SelectionPicker: React.FC<Props> = ({
  selectedValue,
  onValueChange,
  value,
  selection,
}) => {
  return (
    <Picker
      selectedValue={selectedValue}
      onValueChange={onValueChange}
      itemStyle={{ fontSize: 16 }}
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

export default SelectionPicker;