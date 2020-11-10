import * as React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Button, Menu, Divider, Provider } from 'react-native-paper';
import { MaterialCommunityIcons } from "@expo/vector-icons";

const PopUpMenu = ({actionsMenu, groceryListID}) => {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <Provider>
      <View
        style={{
          alignItems: 'flex-end',
        }}>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<TouchableOpacity onPress={openMenu}>
            <MaterialCommunityIcons name="dots-vertical" size={24} color="black" />
          </TouchableOpacity>
          }>
            {actionsMenu.map(action=>
              <Menu.Item key={action.title}icon={action.icon} title={action.name} onPress={() => action.onPress(groceryListID)} title={action.title} />
              )}
          
        </Menu>
      </View>
    </Provider>
  );
};

export default PopUpMenu;