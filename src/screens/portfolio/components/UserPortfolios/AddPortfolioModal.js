import { Text, useTheme, Modal, Portal } from "react-native-paper";
import { Button, TextInput } from "../../../../shared-components";
import { GLOBAL_CONSTANTS } from "../../../../constants";
import { KeyboardAvoidingView } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Keyboard } from "react-native";
import { GLOBAL_STYLES, TYPOGRAPHY } from "../../../../styles";
import { useEffect } from "react";

function AddPortfolioModal({ isVisible, onDismiss, onSubmit, isLoading, portfolioToEdit }) {
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
        contentContainerStyle={{
          backgroundColor: "white",
          ...GLOBAL_STYLES.screenContainer,
          marginHorizontal: GLOBAL_CONSTANTS.MD_MARGIN,
          borderRadius: GLOBAL_CONSTANTS.BORDER_RADIUS
        }}
        dismissable={!isLoading}
      >
        <Text style={[TYPOGRAPHY.title, { marginBottom: GLOBAL_CONSTANTS.MD_MARGIN }]}>
          {isEditing ? "Update Portfolio" : "Create New Portfolio"}
        </Text>
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
                style={{ marginBottom: GLOBAL_CONSTANTS.LG_MARGIN }}
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

export default AddPortfolioModal;
