import * as React from 'react';
import { Modal, Portal, Text, Provider, Button } from 'react-native-paper';
import { blue } from '../utils/helpers';
import RoundButton from './RoundButton';
import SubmitBtn from './SubmitBtn';
import { StyleSheet } from "react-native";

const ModalAddList = ({goToNewGroceryList, goToJoinGroceryList, showModal,visible, hideModal}) => {

  const containerStyle = {backgroundColor: 'white', padding: 20};

  return (
    <Provider>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
          <SubmitBtn
            onPress = {goToNewGroceryList}
            title = "New Grocery List"
          />
          <SubmitBtn
            onPress = {goToJoinGroceryList}
            title = "Join a Grocery List"
          />
        </Modal>
      </Portal>
      <RoundButton
        onPress={showModal}
        name="plus-circle"
        color={blue}
        size={40}
        style = {styles.bottom}
      />
    </Provider>
  );
};

export default ModalAddList;


const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    textAlign: "center"
  },
  container: {
    flex: 1,
    padding: 20,
  },
  bottom: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginBottom: 46,
  },
  glist: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  glistName: { fontSize: 18 },
});