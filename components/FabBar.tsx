import * as React from 'react';
import { StyleSheet } from 'react-native';
import { FAB, Portal, Provider } from 'react-native-paper';
import { FabBarAction } from '../src/types/ActionElements';
import { mainColor } from '../utils/helpers';



interface Props {
  actions: FabBarAction[];
}


const FabBar: React.FC<Props> = ({ actions }) => {
  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

  return (
    <Provider>
      <Portal>
        <FAB.Group
          open={open}
          icon={'plus'}
          style={styles.fab}
          actions={actions}
          onStateChange={onStateChange}
          fabStyle={{ backgroundColor: mainColor }}
          visible={true}
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