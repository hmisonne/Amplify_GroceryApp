import * as React from 'react';
import { StyleSheet } from 'react-native';
import { FAB, Portal, Provider } from 'react-native-paper';


const FabBar = ({actions}) => {
  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

  return (
    <Provider>
      <Portal>
        <FAB.Group
          open={open}
          icon={open ? '' : 'plus'}
          style={styles.fab}
          actions={actions}
          onStateChange={onStateChange}
          color="white"
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