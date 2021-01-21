import React from "react";
import { View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";


interface Props {
  style?: object,
  onPress: () => void,
  name: string,
  color?: string,
  size?: number,
}

const RoundButton: React.FC<Props> = ({ onPress, name, color, style = {}, size = 24 }) => {
  return (
    <View>
      <TouchableOpacity style={style} onPress={onPress}>
        <MaterialCommunityIcons name={name} size={size} color={color} />
      </TouchableOpacity>
    </View>
  );
}
export default RoundButton
