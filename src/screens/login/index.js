import React from "react";
import { StyleSheet, Keyboard } from "react-native";
import { GLOBAL_STYLES, TYPOGRAPHY } from "../../styles";
import { Text } from "react-native-paper";
import { Form } from "./components";
import { PressableView } from "../../shared-components";

const LoginScreen = () => {
  return (
    <PressableView onPress={Keyboard.dismiss} viewStyle={STYLES.container}>
      <Text style={STYLES.heading}>Welcome Back</Text>
      <Form />
    </PressableView>
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
