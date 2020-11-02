import * as React from 'react';
import { Modal, Portal, Text, Provider, Button } from 'react-native-paper';
import { blue } from '../utils/helpers';
import RoundButton from './RoundButton';
import SubmitBtn from './SubmitBtn';

const ModalWithNavButton = ({navigationOptions,visible, hideModal}) => {

  const containerStyle = {backgroundColor: 'white', padding: 20};

  return (

      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
          {navigationOptions.map(option =>
             <SubmitBtn
             onPress = {option.onPress}
             title = {option.title}
           />
          )}
         
        </Modal>
      </Portal>
  );
};

export default ModalWithNavButton;