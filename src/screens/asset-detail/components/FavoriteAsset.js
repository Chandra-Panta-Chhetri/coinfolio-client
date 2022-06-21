import React from "react";
import { useTheme } from "react-native-paper";
import { Fontisto } from "@expo/vector-icons";
import { GLOBAL_CONSTANTS } from "../../../constants";

const FavoriteAsset = (props) => {
  const { colors } = useTheme();

  return (
    <Fontisto
      name="bookmark"
      size={GLOBAL_CONSTANTS.ICON_SIZE}
      style={{ marginRight: GLOBAL_CONSTANTS.LG_MARGIN }}
      color={colors.text}
    />
  );
};

export default FavoriteAsset;
