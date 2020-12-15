import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Snackbar } from 'react-native-paper';
import PropTypes from "prop-types";
import { mainColor } from '../utils/helpers';

const SnackbarUndo = ({visible, onDismissSnackBar, undoAction, snackContent}) => {

  return (
    <View style={styles.container}>
      <Snackbar
        visible={visible}
        theme = {{colors: {
          accent: mainColor,
        },
      }}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Undo',
          onPress: undoAction,
        }}>
        {snackContent}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

export default SnackbarUndo;

SnackbarUndo.propTypes = {
  visible: PropTypes.bool.isRequired,
  onDismissSnackBar:PropTypes.func.isRequired, 
  undoAction: PropTypes.func.isRequired, 
  snackContent: PropTypes.string.isRequired,
};