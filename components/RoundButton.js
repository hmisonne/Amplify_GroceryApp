import React from "react";
import { View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import PropTypes from "prop-types";

export default function RoundButton({ onPress, name, color, style = {}, size=24 }) {
  return (
    <View>
      <TouchableOpacity style={style} onPress={onPress}>
        <MaterialCommunityIcons name={name} size={size} color={color} />
      </TouchableOpacity>
    </View>
  );
}

RoundButton.propTypes = {
  style: PropTypes.object,
  onPress: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
  size: PropTypes.number,
};