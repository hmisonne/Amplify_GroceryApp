import React from "react";
import { View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function RoundButton({ onPress, name, color, style = {}, size=24 }) {
  return (
    <View>
      <TouchableOpacity style={style} onPress={onPress}>
        <MaterialCommunityIcons name={name} size={size} color={color} />
      </TouchableOpacity>
    </View>
  );
}
