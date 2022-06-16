import React, { useRef } from "react";
import { StyleSheet, View } from "react-native";
import { GLOBAL_STYLES } from "../../../styles";
import { useTheme } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import { TextInput, Button, Link, PasswordInput } from "../../../shared-components";
import { connect } from "react-redux";
import { selectIsChangingAuthState, startEmailLogin } from "../../../redux/user";

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
      <View>
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
              style={GLOBAL_STYLES.smMarginBottom}
            />
          )}
          name="password"
        />
        <Link label="Forgot password ?" navigateTo="SignUp" containerStyle={STYLES.forgotPassword} />
      </View>
      <View>
        <Button
          label={isLoggingIn ? "Logging in..." : "Log in"}
          disabled={isLoggingIn || !isValid || !isDirty}
          loading={isLoggingIn}
          onPress={handleSubmit(onSubmit)}
          mode="contained"
          style={GLOBAL_STYLES.mdMarginBottom}
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
  field: {
    ...GLOBAL_STYLES.lgMarginBottom
  },
  forgotPassword: {
    alignSelf: "flex-end"
  },
  signUp: {
    alignSelf: "center"
  }
});

const mapStateToProps = (state) => ({
  isLoggingIn: selectIsChangingAuthState(state)
});

const mapDispatchToProps = (dispatch) => ({
  login: (credentials) => dispatch(startEmailLogin(credentials))
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
