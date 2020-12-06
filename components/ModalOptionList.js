import * as React from "react";
import { TouchableOpacity, Text, StyleSheet} from "react-native";
import { Modal, Portal } from "react-native-paper";
import PropTypes from "prop-types";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ModalOptionList = ({ actionsMenu, visible, closeMenu, groceryList}) => {
  const containerStyle = { backgroundColor: "white", padding: 20 };

  return (
      <Portal>
        <Modal
          visible={visible}
          onDismiss={closeMenu}
          contentContainerStyle={containerStyle}
        >
          {actionsMenu.map((action, index) => (
              <TouchableOpacity
                key = {index}
                style={styles.row}
                onPress={() => {
                  action.onPress(groceryList);
                  closeMenu();
                }}
              >
                <MaterialCommunityIcons
                  name={action.icon}
                  style={styles.iconSpace}
                  size={24}
                  color="black"
                />
                <Text style={styles.text}>{action.title}</Text>
              </TouchableOpacity>

          ))}
        </Modal>
      </Portal>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    margin: 20
  },
  iconSpace: {
    marginRight: 15
  },
  text : {
    fontSize: 18
  }
});

export default ModalOptionList;

ModalOptionList.propTypes = {
  actionsMenu:PropTypes.array.isRequired, 
  visible: PropTypes.bool.isRequired, 
  closeMenu: PropTypes.func.isRequired, 
  groceryList: PropTypes.object.isRequired,
};