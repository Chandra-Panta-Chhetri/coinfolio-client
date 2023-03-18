import React, { forwardRef } from "react";
import { TextInput, useTheme } from "react-native-paper";

const CustomTextInput = forwardRef((props, ref) => {
  const { colors } = useTheme();

  return <TextInput {...props} label={undefined} ref={ref} mode="outlined" activeOutlineColor={colors.text} />;
});

CustomTextInput.Icon = TextInput.Icon;

export default CustomTextInput;
