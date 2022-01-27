import React from "react";
import { IconButton, useTheme } from "react-native-paper";

const CloseIconButton = ({ onPress, style = {} }) => {
  const { colors } = useTheme();
  return <IconButton icon="close" size={25} onPress={onPress} color={colors.text} style={style} />;
};

export default CloseIconButton;
