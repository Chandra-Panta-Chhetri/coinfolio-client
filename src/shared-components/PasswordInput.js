import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { GLOBAL_STYLES, TYPOGRAPHY } from "../styles";
import { useTheme } from "react-native-paper";
import TextInput from "./TextInput";

const PasswordInput = (props) => {
  const [isShown, setIsShown] = useState(false);

  return <TextInput {...props} secureTextEntry label="Password" style={[GLOBAL_STYLES.smMarginBottom, props.style]} />;
};

export default PasswordInput;
