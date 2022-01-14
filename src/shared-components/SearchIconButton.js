import React from "react";
import { IconButton, useTheme } from "react-native-paper";
import { GLOBAL_CONSTANTS } from "../constants";

const SearchIconButton = ({
  onPress = GLOBAL_CONSTANTS.EMPTY_FUNCTION,
  style = {}
}) => {
  const { colors } = useTheme();
  return (
    <IconButton
      icon="magnify"
      size={30}
      onPress={onPress}
      color={colors.text}
      style={style}
    />
  );
};

export default SearchIconButton;
