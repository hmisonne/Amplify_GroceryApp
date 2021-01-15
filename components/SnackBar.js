import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Snackbar } from 'react-native-paper';
import PropTypes from "prop-types";
import { mainColor } from '../utils/helpers';

const SnackBarAlert = ({visible, onDismissSnackBar, undoAction=null, snackContent}) => {

  return (
      <Snackbar
        visible={visible}
        duration = {1000}
        theme = {{colors: {
          accent: mainColor,
        },
      }}
        onDismiss={onDismissSnackBar}
        action={undoAction
          ? {
          label: 'Undo',
          onPress: undoAction,
        }: {}
      }>
        {snackContent}
      </Snackbar>
  );
};


export default SnackBarAlert;

SnackBarAlert.propTypes = {
  visible: PropTypes.bool.isRequired,
  onDismissSnackBar:PropTypes.func.isRequired, 
  undoAction: PropTypes.func, 
  snackContent: PropTypes.string.isRequired,
};