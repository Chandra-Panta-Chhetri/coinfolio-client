import React, { forwardRef } from "react";
import { TextInput, useTheme } from "react-native-paper";
import { GLOBAL_CONSTANTS } from "../constants";
import { StyleSheet } from "react-native";

const CustomTextInput = forwardRef((props, ref) => {
  const { colors } = useTheme();

  return (
    <TextInput
      {...props}
      ref={ref}
      mode="outlined"
      placeholder={props?.placeholder ?? props?.label}
      activeOutlineColor={colors?.text}
      label={undefined}
      selectionColor={colors?.primary}
      cursorColor={colors?.primary}
      outlineStyle={STYLES.outlineStyle}
    />
  );
});

CustomTextInput.Icon = TextInput.Icon;
CustomTextInput.Affix = TextInput.Affix;

const STYLES = StyleSheet.create({
  outlineStyle: {
    borderRadius: GLOBAL_CONSTANTS.BORDER_RADIUS,
    borderWidth: GLOBAL_CONSTANTS.BORDER_WIDTH
  }
});

export default CustomTextInput;
