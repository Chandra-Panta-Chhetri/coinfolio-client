import React from "react";
import { IconButton, useTheme } from "react-native-paper";
import { GLOBAL_CONSTANTS } from "../constants";

const CloseIconButton = ({
  onPress = GLOBAL_CONSTANTS.EMPTY_FUNCTION,
  style = {}
}) => {
  const { colors } = useTheme();
  return (
    <IconButton
      icon="close"
      size={25}
      onPress={onPress}
      color={colors.text}
      style={style}
    />
  );
};

export default CloseIconButton;
