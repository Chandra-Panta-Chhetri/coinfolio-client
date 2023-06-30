import React from "react";
import { StyleSheet } from "react-native";
import { Portal, Modal as RNPModal, useTheme } from "react-native-paper";
import { GLOBAL_CONSTANTS } from "../constants";
import { GLOBAL_STYLES } from "../styles";

function Modal({ children, ...modalProps }) {
  const { colors } = useTheme();

  return (
    <Portal>
      <RNPModal contentContainerStyle={[STYLES.modal, { backgroundColor: colors.card }]} {...modalProps}>
        {children}
      </RNPModal>
    </Portal>
  );
}

const STYLES = StyleSheet.create({
  modal: {
    ...GLOBAL_STYLES.screenContainer,
    marginHorizontal: GLOBAL_CONSTANTS.MD_MARGIN,
    borderRadius: GLOBAL_CONSTANTS.BORDER_RADIUS
  }
});

export default Modal;
