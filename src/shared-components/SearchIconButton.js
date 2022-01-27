import React from "react";
import { IconButton, useTheme } from "react-native-paper";

const SearchIconButton = ({ onPress, style = {} }) => {
  const { colors } = useTheme();
  return <IconButton icon="magnify" size={30} onPress={onPress} color={colors.text} style={style} />;
};

export default SearchIconButton;
