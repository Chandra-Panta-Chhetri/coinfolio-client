import React from "react";
import { IconButton, useTheme } from "react-native-paper";
import { GLOBAL_CONSTANTS } from "../constants";

const SearchIconButton = ({ onPress, style = {} }) => {
  const { colors } = useTheme();
  return (
    <IconButton icon="magnify" size={GLOBAL_CONSTANTS.ICON_SIZE} onPress={onPress} color={colors.text} style={style} />
  );
};

export default SearchIconButton;
