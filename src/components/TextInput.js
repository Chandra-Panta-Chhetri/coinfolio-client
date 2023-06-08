import React, { forwardRef } from "react";
import { TextInput as RNPTextInput, useTheme } from "react-native-paper";

const TextInput = forwardRef((props, ref) => {
  const { colors } = useTheme();

  return <RNPTextInput {...props} ref={ref} mode="outlined" activeOutlineColor={colors?.text} />;
});

TextInput.Icon = RNPTextInput.Icon;

export default TextInput;
