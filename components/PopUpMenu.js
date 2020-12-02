import * as React from "react";
import { TouchableOpacity, View, StyleSheet} from "react-native";
import { Modal, Portal, Text  } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import PropTypes from "prop-types";

const PopUpMenu = ({ actionsMenu, groceryListID, groceryList }) => {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);
  const containerStyle = { backgroundColor: "white", padding: 20 };

  return (
    <View>
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

      <TouchableOpacity onPress={openMenu}>
        <MaterialCommunityIcons name="dots-vertical" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default PopUpMenu;

PopUpMenu.propTypes = {
  actionsMenu: PropTypes.array.isRequired,
  groceryListID: PropTypes.string.isRequired,
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