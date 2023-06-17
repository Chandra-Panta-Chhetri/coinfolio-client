import React, { forwardRef } from "react";
import { TextInput as RNPTextInput, useTheme } from "react-native-paper";

const TextInput = forwardRef((props, ref) => {
  const { colors } = useTheme();

  return (
    <RNPTextInput
      {...props}
      ref={ref}
      mode="outlined"
      placeholder={props?.placeholder ?? props?.label}
      activeOutlineColor={colors?.text}
      label={undefined}
    />
  );
});

TextInput.Icon = RNPTextInput.Icon;

export default TextInput;
