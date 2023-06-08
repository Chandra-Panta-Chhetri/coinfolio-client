import React from "react";
import { Keyboard, StyleSheet } from "react-native";
import { GLOBAL_STYLES, TYPOGRAPHY } from "../../styles";
import { Text } from "react-native-paper";
import { Form } from "./components";
import { PressableView } from "../../components";
import { GLOBAL_CONSTANTS } from "../../constants";

const SignUpScreen = () => {
  return (
    <PressableView viewStyle={STYLES.container} onPress={Keyboard.dismiss}>
      <Text style={STYLES.heading}>Create New Account</Text>
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
    marginBottom: GLOBAL_CONSTANTS.LG_MARGIN
  }
});

export default SignUpScreen;
