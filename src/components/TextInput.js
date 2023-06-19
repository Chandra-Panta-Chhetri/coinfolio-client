import React, { forwardRef } from "react";
import { TextInput, useTheme } from "react-native-paper";

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
    />
  );
});

CustomTextInput.Icon = TextInput.Icon;

export default CustomTextInput;
