import React from "react";
import { Button } from "react-native-paper";
import { TYPOGRAPHY } from "../styles";

const CustomButton = ({ label, ...otherProps }) => (
  <Button {...otherProps} uppercase={false} labelStyle={[TYPOGRAPHY.button, otherProps.labelStyle]}>
    {label}
  </Button>
);

export default CustomButton;
