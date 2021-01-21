import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { mainColor, secondaryColor } from "../utils/helpers";


interface Props {
  title: string;
  onPress: () => void;
  style?: object,
  disabled?: boolean;
}


const SubmitBtn: React.FC<Props> = ({
  title,
  onPress,
  disabled = false,
  style = {},
}) => {

  return (
    <TouchableOpacity
      style={
        disabled
          ? [styles.btn, style, { backgroundColor: "#c7c5bf" }]
          : [styles.btn, style]
      }
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.btnText}> {title} </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: mainColor,
    borderRadius: 10,
    marginTop: 10,
    paddingTop: 15,
    paddingBottom: 15,
    marginLeft: 100,
    marginRight: 100,
  },
  btnText: {
    color: secondaryColor,
    textAlign: "center",
  },
});

export default SubmitBtn;