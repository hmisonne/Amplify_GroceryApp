import * as React from 'react';
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
          actions={actions}
          onStateChange={onStateChange}
          color="white"
        />
      </Portal>
    </Provider>
  );
};


export default FabBar;