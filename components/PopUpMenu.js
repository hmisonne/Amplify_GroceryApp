import * as React from "react";
import { TouchableOpacity, View, StyleSheet} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import PropTypes from "prop-types";
import ModalOptionList from './ModalOptionList'

const PopUpMenu = ({ actionsMenu, groceryList }) => {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <View>
      <ModalOptionList 
        actionsMenu={actionsMenu} 
        groceryList={groceryList} 
        visible={visible}
        closeMenu={closeMenu}/>

      <TouchableOpacity onPress={openMenu}>
        <MaterialCommunityIcons name="dots-vertical" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default PopUpMenu;

PopUpMenu.propTypes = {
  actionsMenu: PropTypes.array.isRequired,
  groceryList: PropTypes.object.isRequired,
};
