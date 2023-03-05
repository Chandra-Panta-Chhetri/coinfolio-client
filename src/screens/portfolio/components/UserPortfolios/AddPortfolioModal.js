import { Text, useTheme, Modal, Portal } from "react-native-paper";
import { Button, TextInput } from "../../../../shared-components";
import { GLOBAL_CONSTANTS } from "../../../../constants";
import { KeyboardAvoidingView } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { GLOBAL_STYLES, TYPOGRAPHY } from "../../../../styles";
import { useEffect } from "react";
import { StyleSheet } from "react-native";

function AddPortfolioModal({ isVisible, onDismiss, onSubmit, isLoading, portfolioToEdit }) {
  const { colors } = useTheme();
  const isEditing = portfolioToEdit !== undefined && portfolioToEdit !== null;
  const submitLabel = isEditing ? (isLoading ? "Updating..." : "Update") : isLoading ? "Creating..." : "Create";

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    reset
  } = useForm({
    defaultValues: {
      nickname: ""
    }
  });

  useEffect(() => {
    if (isVisible) {
      reset();
    }
  }, [isVisible]);

  useEffect(() => {
    if (isEditing) {
      reset({
        nickname: portfolioToEdit?.nickname
      });
    }
  }, [portfolioToEdit]);

  return (
    <Portal>
      <Modal
        visible={isVisible}
        onDismiss={onDismiss}
        contentContainerStyle={[STYLES.modalContainer, { backgroundColor: colors.card }]}
        dismissable={!isLoading}
      >
        <Text style={STYLES.modalTitle}>{isEditing ? "Update Portfolio" : "Create Portfolio"}</Text>
        <KeyboardAvoidingView
          behavior={Platform.select({
            ios: "padding",
            android: "height"
          })}
        >
          <Controller
            control={control}
            rules={{
              required: true
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                returnKeyType="done"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                label="Nickname"
                style={STYLES.formField}
              />
            )}
            name="nickname"
          />
        </KeyboardAvoidingView>
        <Button
          label={submitLabel}
          disabled={isLoading || !isValid || !isDirty}
          loading={isLoading}
          mode="contained"
          onPress={handleSubmit(onSubmit)}
        />
      </Modal>
    </Portal>
  );
}

const STYLES = StyleSheet.create({
  modalContainer: {
    ...GLOBAL_STYLES.screenContainer,
    marginHorizontal: GLOBAL_CONSTANTS.MD_MARGIN,
    borderRadius: GLOBAL_CONSTANTS.BORDER_RADIUS
  },
  modalTitle: { ...TYPOGRAPHY.title, marginBottom: GLOBAL_CONSTANTS.MD_MARGIN },
  formField: { marginBottom: GLOBAL_CONSTANTS.LG_MARGIN }
});

export default AddPortfolioModal;
