import React, { useRef } from "react";
import { StyleSheet, View, KeyboardAvoidingView, Platform } from "react-native";
import { useTheme } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import { TextInput, Button, Link, PasswordInput } from "../../../components";
import { connect } from "react-redux";
import { selectIsChangingAuthState, loginWithEmail } from "../../../redux/user";
import { GLOBAL_CONSTANTS } from "../../../constants";

const Form = ({ isLoggingIn, login }) => {
  const { colors } = useTheme();
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
  const passwordInputRef = useRef();

  const onSubmit = (data) => {
    console.log(errors);
    login(data);
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
              label="Email"
              style={STYLES.field}
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
        <Link label="Forgot password ?" navigateTo="SignUp" containerStyle={STYLES.forgotPassword} />
      </KeyboardAvoidingView>
      <View>
        <Button
          label={isLoggingIn ? "Logging in..." : "Log in"}
          disabled={isLoggingIn || !isValid || !isDirty}
          loading={isLoggingIn}
          onPress={handleSubmit(onSubmit)}
          mode="contained"
          style={STYLES.loginButton}
        />
        <Link navigateTo="SignUp" label="Don't have an account ?" containerStyle={STYLES.signUp} />
      </View>
    </View>
  );
};

const STYLES = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between"
  },
  loginButton: {
    marginBottom: GLOBAL_CONSTANTS.MD_MARGIN
  },
  field: {
    marginBottom: GLOBAL_CONSTANTS.LG_MARGIN
  },
  forgotPassword: {
    alignSelf: "flex-end"
  },
  signUp: {
    alignSelf: "center"
  },
  flex: {
    flex: 1
  },
  passwordInput: {
    marginBottom: GLOBAL_CONSTANTS.SM_MARGIN
  }
});

const mapStateToProps = (state) => ({
  isLoggingIn: selectIsChangingAuthState(state)
});

const mapDispatchToProps = (dispatch) => ({
  login: (credentials) => dispatch(loginWithEmail(credentials))
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
