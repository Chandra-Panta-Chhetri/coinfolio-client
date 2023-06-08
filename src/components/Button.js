import React from "react";
import { Button as RNPButton } from "react-native-paper";
import { TYPOGRAPHY } from "../styles";

const Button = ({ children, label, ...otherProps }) => (
  <RNPButton
    {...otherProps}
    label={undefined}
    uppercase={false}
    labelStyle={[TYPOGRAPHY.button, otherProps?.labelStyle]}
  >
    {children}
    {label}
  </RNPButton>
);

export default Button;
