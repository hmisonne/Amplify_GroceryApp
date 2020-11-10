import * as React from 'react';
import { StyleSheet } from 'react-native';
import { FAB, Portal, Provider } from 'react-native-paper';
import { mainColor, secondaryColor } from '../utils/helpers';


const FabBar = ({actions}) => {
  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

  return (
    <Provider>
      <Portal>
        <FAB.Group
          open={open}
          icon={ 'plus'}
          style={styles.fab}
          actions={actions}
          onStateChange={onStateChange}
          fabStyle={{backgroundColor: mainColor}}
        
        />
      </Portal>
    </Provider>
  );
};

const styles = StyleSheet.create({
    fab: {
      position: 'absolute',
      right: 0,
      bottom: 0,
    },
  })

export default FabBar;