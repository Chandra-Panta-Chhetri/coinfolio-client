import React from "react";
import { Text, Dialog, Portal, useTheme } from "react-native-paper";
import { TYPOGRAPHY } from "../styles";
import Button from "./Button";

const ConfirmationDialog = ({
  confirmationText = "",
  onConfirmCb,
  confirmationTitle = "",
  isVisible = false,
  hideDialog,
  isLoading = false
}) => {
  const { colors } = useTheme();

  return (
    <Portal>
      <Dialog visible={isVisible} dismissable={!isLoading} onDismiss={hideDialog}>
        <Dialog.Title style={TYPOGRAPHY.capitalize}>{confirmationTitle}</Dialog.Title>
        <Dialog.Content>
          <Text style={TYPOGRAPHY.subheading}>{confirmationText}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideDialog} label="No" disabled={isLoading} />
          <Button
            onPress={onConfirmCb}
            label="Yes"
            color={colors.notification}
            loading={isLoading}
            disabled={isLoading}
          />
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default ConfirmationDialog;
