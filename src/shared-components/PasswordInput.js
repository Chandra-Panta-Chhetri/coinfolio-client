import React, { useState, forwardRef } from "react";
import TextInput from "./TextInput";

const PasswordInput = forwardRef((props, ref) => {
  const [isShown, setIsShown] = useState(false);

  return (
    <TextInput
      {...props}
      ref={ref}
      secureTextEntry={!isShown}
      label="Password"
      style={props.style}
      right={<TextInput.Icon name={isShown ? "eye" : "eye-off"} onPress={() => setIsShown((isShown) => !isShown)} />}
    />
  );
});

export default PasswordInput;
