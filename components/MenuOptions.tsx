import * as React from "react";
import { View } from "react-native";
import { Menu } from "react-native-paper";
import RoundButton from "./RoundButton";
import { createTwoButtonAlert } from "../utils/helpers"
import { GroceryList } from "../src/models"
import { MenuAction } from "../src/types/ActionElements";



interface Props {
  actionsMenu: MenuAction[];
  groceryList: GroceryList;

}



const MenuOptions: React.FC<Props> = ({ actionsMenu, groceryList }) => {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <RoundButton
            onPress={openMenu}
            name="dots-vertical"
            style={{ marginRight: 20 }}
          />
        }
      >
        {actionsMenu.map((action, index) => (
          <Menu.Item
            key={index}
            icon={action.icon}
            onPress={() => {
              action.validationNeeded
                ? createTwoButtonAlert(() => action.onPress(groceryList), action.message, action.alertTitle)
                : action.onPress(groceryList)
              closeMenu();
            }}
            title={action.title}
          />
        ))
        }
      </Menu>
    </View>
  );
};

export default MenuOptions;
