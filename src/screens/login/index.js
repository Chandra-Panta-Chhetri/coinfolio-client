import React from "react";
import { StyleSheet, View } from "react-native";
import { GLOBAL_STYLES, TYPOGRAPHY } from "../../styles";
import { Text } from "react-native-paper";
import { Form } from "./components";

const LoginScreen = () => {
  return (
    <View style={STYLES.container}>
      <Text style={STYLES.heading}>Welcome Back</Text>
      <Form />
    </View>
  );
};

const STYLES = StyleSheet.create({
  container: {
    ...GLOBAL_STYLES.screenContainer,
    flex: 1
  },
  heading: {
    ...TYPOGRAPHY.title,
    ...TYPOGRAPHY.textAlignCenter,
    ...GLOBAL_STYLES.lgMarginBottom
  }
});

export default LoginScreen;
