import React, { useRef } from "react";
import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import { GLOBAL_STYLES } from "../../../styles";
import { useForm, Controller } from "react-hook-form";
import { TextInput, Button, Link, PasswordInput } from "../../../shared-components";
import { connect } from "react-redux";
import { selectIsChangingAuthState, startUserRegister } from "../../../redux/user";

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
              style={GLOBAL_STYLES.smMarginBottom}
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
          style={GLOBAL_STYLES.mdMarginBottom}
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
  field: {
    ...GLOBAL_STYLES.lgMarginBottom
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
  registerUser: (newUser) => dispatch(startUserRegister(newUser))
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
