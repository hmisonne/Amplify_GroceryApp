import * as React from 'react';
import { Snackbar } from 'react-native-paper';
import { mainColor } from '../utils/helpers';

interface Props {
  visible: boolean;
  onDismissSnackBar: () => void;
  snackContent: string;
}


const SnackBarAlert: React.FC<Props> = ({ visible, onDismissSnackBar, snackContent }) => {

  return (
    <Snackbar
      visible={visible}
      duration={1000}
      theme={{
        colors: {
          accent: mainColor,
        },
      }}
      onDismiss={onDismissSnackBar}
      >
      {snackContent}
    </Snackbar>
  );
};


export default SnackBarAlert;