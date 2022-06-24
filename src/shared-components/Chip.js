import React from "react";
import { useTheme, Text } from "react-native-paper";
import PressableView from "./PressableView";
import { StyleSheet } from "react-native";
import { TYPOGRAPHY } from "../styles";
import { COLORS, GLOBAL_CONSTANTS } from "../constants";

const Chip = ({
  isHighlighted = false,
  containerStyle = {},
  label = "",
  Icon = null,
  highlightedStyle,
  defaultStyle,
  ...otherProps
}) => {
  const { colors, dark: isDarkMode } = useTheme();
  const highlightedStyles = highlightedStyle || {
    backgroundColor: colors.primary,
    color: COLORS.WHITE
  };

  const defaultStyles = defaultStyle || {
    color: colors.text,
    backgroundColor: colors.border
  };

  const textColor = isHighlighted ? highlightedStyles.color : defaultStyles.color;

  return (
    <PressableView
      viewStyle={[STYLES.container, isHighlighted ? highlightedStyles : defaultStyles, containerStyle]}
      {...otherProps}
    >
      {Icon && <Icon color={textColor} />}
      <Text
        style={[
          STYLES.label,
          {
            color: textColor,
            marginLeft: Icon ? GLOBAL_CONSTANTS.SM_MARGIN : 0
          }
        ]}
      >
        {label}
      </Text>
    </PressableView>
  );
};

const STYLES = StyleSheet.create({
  container: {
    borderRadius: GLOBAL_CONSTANTS.ICON_SIZE,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  label: {
    ...TYPOGRAPHY.subheading
  }
});

export default Chip;
