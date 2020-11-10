import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const PopUpMenuMobile = ({actionsMenu, groceryListID}) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
              {actionsMenu.map(action=>
                <TouchableHighlight
                key= {action.title}
                style={styles.optionView}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  action.onPress(groceryListID)
                }}
              >
                  <View style={styles.rowView}>
                    <MaterialCommunityIcons name={action.icon} size={24} color="black" />
                    <Text style={styles.textStyle}>{action.title}</Text>
                  </View>
              </TouchableHighlight>
                )}
            <TouchableHighlight
                style={styles.optionView}
                onPress={() => {
                    setModalVisible(!modalVisible)
                }}
              >
                  <View style={styles.rowView}>
                    <MaterialCommunityIcons name='close' size={24} color="black" />
                    <Text style={styles.textStyle}>Close</Text>
                  </View>
              </TouchableHighlight>
          </View>
        </View>
      </Modal>

      <TouchableHighlight
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <MaterialCommunityIcons name="dots-vertical" size={24} color="black" />
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    alignItems: 'flex-end',
  },
  optionView : {
      marginBottom: 20
  },
  rowView : {
    flexDirection: 'row'
    },
  modalView: {
    marginTop: 50,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    paddingRight: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },

  textStyle: {
    color: "black",
    marginLeft: 15
  },
});

export default PopUpMenuMobile;

