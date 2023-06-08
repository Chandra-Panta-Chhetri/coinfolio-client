import React, { useRef } from "react";
import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { TextInput, Button, Link, PasswordInput } from "../../../components";
import { connect } from "react-redux";
import { selectIsChangingAuthState, registerUser } from "../../../redux/user";
import { GLOBAL_CONSTANTS } from "../../../constants";

const Form = ({ isSigningUp, registerUser }) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isDirty }
  } = useForm({
    defaultValues: {
      email: "",
      password: ""
    }
  });
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const onSubmit = (data) => {
    console.log(errors);
    registerUser(data);
  };

  return (
    <View style={STYLES.container}>
      <KeyboardAvoidingView
        behavior={Platform.select({
          ios: "padding",
          android: "height"
        })}
        style={STYLES.flex}
      >
        <Controller
          control={control}
          rules={{
            required: true
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              returnKeyType="next"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              label="Name"
              style={STYLES.field}
              onSubmitEditing={() => emailInputRef.current?.focus()}
            />
          )}
          name="name"
        />
        <Controller
          control={control}
          rules={{
            required: true
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              returnKeyType="next"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              label="Email"
              style={STYLES.field}
              ref={emailInputRef}
              onSubmitEditing={() => passwordInputRef.current?.focus()}
            />
          )}
          name="email"
        />
        <Controller
          control={control}
          rules={{
            required: true
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <PasswordInput
              ref={passwordInputRef}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={STYLES.passwordInput}
            />
          )}
          name="password"
        />
      </KeyboardAvoidingView>
      <View>
        <Button
          label={isSigningUp ? "Creating account..." : "Create"}
          disabled={isSigningUp || !isValid || !isDirty}
          loading={isSigningUp}
          onPress={handleSubmit(onSubmit)}
          mode="contained"
          style={STYLES.createButton}
        />
        <Link navigateTo="Login" label="Have an account ?" containerStyle={STYLES.signUp} />
      </View>
    </View>
  );
};

const STYLES = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between"
  },
  createButton: {
    marginBottom: GLOBAL_CONSTANTS.MD_MARGIN
  },
  field: {
    marginBottom: GLOBAL_CONSTANTS.LG_MARGIN
  },
  passwordInput: {
    marginBottom: GLOBAL_CONSTANTS.SM_MARGIN
  },
  forgotPassword: {
    alignSelf: "flex-end"
  },
  signUp: {
    alignSelf: "center"
  },
  flex: {
    flex: 1
  }
});

const mapStateToProps = (state) => ({
  isSigningUp: selectIsChangingAuthState(state)
});

const mapDispatchToProps = (dispatch) => ({
  registerUser: (newUser) => dispatch(registerUser(newUser))
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
