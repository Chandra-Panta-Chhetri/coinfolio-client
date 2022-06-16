import React, { useState, forwardRef } from "react";
import { StyleSheet, View } from "react-native";
import { GLOBAL_STYLES, TYPOGRAPHY } from "../styles";
import { useTheme } from "react-native-paper";
import TextInput from "./TextInput";

const PasswordInput = forwardRef((props, ref) => {
  const [isShown, setIsShown] = useState(false);

  return (
    <TextInput
      {...props}
      ref={ref}
      secureTextEntry={!isShown}
      label="Password"
      style={[GLOBAL_STYLES.smMarginBottom, props.style]}
      right={<TextInput.Icon name={isShown ? "eye" : "eye-off"} onPress={() => setIsShown((isShown) => !isShown)} />}
    />
  );
});

export default PasswordInput;
