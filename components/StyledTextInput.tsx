import React from "react";
import { TextInput } from 'react-native-paper';


interface Props {
  onChangeText: () => void;
  value: string;
  placeholder?: string;
  multiline?: boolean;
  keyboardType?: any;
  style?: object;
  label: string;
}

// const StyledTextInput: React.FC<Props>
const StyledTextInput: React.FC<Props> = ({
  value, placeholder, onChangeText, label, multiline = false, keyboardType = 'default', style = {}
}) => {

  return (
    <TextInput
      label={label}
      mode="outlined"
      onChangeText={onChangeText}
      value={value}
      placeholder={placeholder}
      testID="TextInput"
      multiline={multiline}
      keyboardType={keyboardType}
      style={style}
    />
  );
}

export default StyledTextInput