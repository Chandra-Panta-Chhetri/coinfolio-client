import React from "react";
import { IconButton, useTheme } from "react-native-paper";
import { GLOBAL_CONSTANTS } from "../constants";

const CloseIconButton = ({ onPress, style = {} }) => {
  const { colors } = useTheme();
  return (
    <IconButton
      icon="close"
      size={GLOBAL_CONSTANTS.ICON_SIZE}
      onPress={onPress}
      iconColor={colors.text}
      style={style}
    />
  );
};

export default CloseIconButton;
