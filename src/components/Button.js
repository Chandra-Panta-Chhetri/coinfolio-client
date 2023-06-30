import React from "react";
import { Button as RNPButton } from "react-native-paper";
import { TYPOGRAPHY } from "../styles";
import { StyleSheet } from "react-native";
import { COLORS } from "../constants";

const Button = ({ children, label, ...otherProps }) => (
  <RNPButton
    {...otherProps}
    label={undefined}
    uppercase={false}
    labelStyle={[TYPOGRAPHY.button, otherProps?.labelStyle]}
    style={[STYLES.button, otherProps?.style]}
  >
    {children}
    {label}
  </RNPButton>
);

const STYLES = StyleSheet.create({
  button: {
    shadowColor: COLORS.TRANSPARENT
  }
});

export default Button;
