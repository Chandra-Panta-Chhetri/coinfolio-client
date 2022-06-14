import React from "react";
import { StyleSheet, View } from "react-native";
import { GLOBAL_STYLES, TYPOGRAPHY } from "../../../styles";
import { useTheme } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import { TextInput, Button, Link, PasswordInput } from "../../../shared-components";
import { connect } from "react-redux";
import { selectIsChangingAuthState, startUserRegister } from "../../../redux/user";

const Form = ({ isSigningUp, registerUser }) => {
  const { colors } = useTheme();
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = (data) => {
    console.log(errors);
    registerUser(data);
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
              label="Name"
              style={STYLES.field}
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
            <PasswordInput onBlur={onBlur} onChangeText={onChange} value={value} style={GLOBAL_STYLES.smMarginBottom} />
          )}
          name="password"
        />
      </View>
      <View>
        <Button
          label={isSigningUp ? "Creating account..." : "Create"}
          disabled={isSigningUp}
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
  }
});

const mapStateToProps = (state) => ({
  isSigningUp: selectIsChangingAuthState(state)
});

const mapDispatchToProps = (dispatch) => ({
  registerUser: (newUser) => dispatch(startUserRegister(newUser))
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
