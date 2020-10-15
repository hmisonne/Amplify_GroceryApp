import React from "react";
import { View, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function RoundButton({ onPress, name, color, style = {} }) {
  return (
    <View>
      <TouchableOpacity style={style} onPress={onPress}>
        <AntDesign name={name} size={24} color={color} />
      </TouchableOpacity>
    </View>
  );
}
