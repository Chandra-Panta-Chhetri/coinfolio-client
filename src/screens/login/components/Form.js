import React from "react";
import { StyleSheet, View } from "react-native";
import { GLOBAL_STYLES, TYPOGRAPHY } from "../../../styles";
import { useTheme } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import { TextInput, Button, Link, PasswordInput } from "../../../shared-components";

const Form = () => {
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
    console.log(data);
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
            <TextInput onBlur={onBlur} onChangeText={onChange} value={value} label="Email" style={STYLES.field} />
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
        <Link label="Forgot password ?" navigateTo="SignUp" containerStyle={STYLES.forgotPassword} />
      </View>
      <View>
        <Button label="Log in" onPress={handleSubmit(onSubmit)} mode="contained" style={GLOBAL_STYLES.mdMarginBottom} />
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

export default Form;
