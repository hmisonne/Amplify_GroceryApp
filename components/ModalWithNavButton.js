import * as React from "react";
import { Modal, Portal } from "react-native-paper";
import SubmitBtn from "./SubmitBtn";
import PropTypes from "prop-types";

const ModalWithNavButton = ({ navigationOptions, visible, hideModal }) => {
  const containerStyle = { backgroundColor: "white", padding: 20 };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={containerStyle}
      >
        {navigationOptions.map((option, index) => (
          <SubmitBtn key={index} onPress={option.onPress} title={option.title} />
        ))}
      </Modal>
    </Portal>
  );
};

export default ModalWithNavButton;

ModalWithNavButton.propTypes = {
  navigationOptions: PropTypes.array.isRequired,
  visible: PropTypes.bool.isRequired,
  hideModal: PropTypes.func.isRequired,
};