import React from "react";
import { useTheme, Text } from "react-native-paper";
import PressableView from "./PressableView";
import { GLOBAL_STYLES, TYPOGRAPHY } from "../styles";
import { COLORS } from "../constants";

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
    backgroundColor: isDarkMode ? colors.text : colors.primary,
    color: isDarkMode ? colors.border : "white"
  };

  const defaultStyles = defaultStyle || {
    color: colors.text,
    backgroundColor: isDarkMode ? colors.border : COLORS.LIGHT_GREY
  };

  const textColor = isHighlighted ? highlightedStyles.color : defaultStyles.color;

  return (
    <PressableView
      viewStyle={[GLOBAL_STYLES.iconRoundness, isHighlighted ? highlightedStyles : defaultStyles, containerStyle]}
      {...otherProps}
    >
      {Icon && <Icon color={textColor} />}
      <Text
        style={[
          TYPOGRAPHY.subheading,
          {
            color: textColor,
            marginLeft: Icon ? 5 : 0
          }
        ]}
      >
        {label}
      </Text>
    </PressableView>
  );
};

export default Chip;
