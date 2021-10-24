import React from "react";
import { Button, Text, Dialog, Portal, useTheme } from "react-native-paper";
import { TYPOGRAPHY } from "../styles";
import { GLOBAL_CONSTANTS } from "../constants";

const ConfirmationDialog = ({
  confirmationText = "",
  onConfirmCb = GLOBAL_CONSTANTS.EMPTY_FUNCTION,
  confirmationTitle = "",
  isVisible = false,
  hideDialog = GLOBAL_CONSTANTS.EMPTY_FUNCTION,
  isLoading = false
}) => {
  const { colors } = useTheme();

  return (
    <Portal>
      <Dialog
        visible={isVisible}
        dismissable={!isLoading}
        onDismiss={hideDialog}
      >
        <Dialog.Title style={TYPOGRAPHY.capitalize}>
          {confirmationTitle}
        </Dialog.Title>
        <Dialog.Content>
          <Text style={TYPOGRAPHY.subheading}>{confirmationText}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            onPress={hideDialog}
            disabled={isLoading}
            labelStyle={TYPOGRAPHY.bold}
          >
            No
          </Button>
          <Button
            onPress={onConfirmCb}
            labelStyle={TYPOGRAPHY.bold}
            color={colors.notification}
            loading={isLoading}
            disabled={isLoading}
          >
            Yes
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default ConfirmationDialog;
