import React from "react";
import { StyleSheet } from "react-native";
import {
  Button,
  Paragraph,
  Dialog,
  Portal,
  useTheme
} from "react-native-paper";
import GlobalStyles from "../../GlobalStyles";

const ConfirmationDialog = ({
  confirmationText = "",
  onConfirmCb = Constants.SHARED.EMPTY_FUNCTION,
  confirmationTitle = "",
  isVisible = false,
  hideDialog = Constants.SHARED.EMPTY_FUNCTION,
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
        <Dialog.Title style={styles.title}>{confirmationTitle}</Dialog.Title>
        <Dialog.Content>
          <Paragraph style={GlobalStyles.subheading}>
            {confirmationText}
          </Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            onPress={hideDialog}
            disabled={isLoading}
            labelStyle={GlobalStyles.bold}
          >
            No
          </Button>
          <Button
            onPress={onConfirmCb}
            labelStyle={GlobalStyles.bold}
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

const styles = StyleSheet.create({
  title: {
    textTransform: "capitalize"
  }
});

export default ConfirmationDialog;
