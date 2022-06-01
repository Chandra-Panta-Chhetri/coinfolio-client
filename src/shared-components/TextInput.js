import React from "react";
import { TextInput, useTheme } from "react-native-paper";

const CustomTextInput = (props) => {
  const { colors } = useTheme();

  return <TextInput {...props} mode="outlined" activeOutlineColor={colors.text} />;
};

export default CustomTextInput;
