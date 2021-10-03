import React from "react";
import { useTheme, Text } from "react-native-paper";
import GlobalStyles from "../../GlobalStyles";
import PressableView from "./PressableView";

const Badge = ({
  isHighlighted = false,
  containerStyle = {},
  label = "",
  icon: Icon = null,
  highlightedStyle,
  defaultStyle,
  ...otherProps
}) => {
  const { colors, dark: isDarkMode } = useTheme();
  const highlightedStyles = highlightedStyle
    ? highlightedStyle
    : {
        backgroundColor: isDarkMode ? colors.text : colors.primary,
        color: isDarkMode ? colors.border : "white"
      };

  const defaultStyles = defaultStyle
    ? defaultStyle
    : {
        color: colors.text,
        backgroundColor: isDarkMode ? colors.border : "lightgrey"
      };

  const textColor = isHighlighted
    ? highlightedStyles.color
    : defaultStyles.color;

  return (
    <PressableView
      viewStyle={[
        GlobalStyles.iconRoundness,
        isHighlighted ? highlightedStyles : defaultStyles,
        containerStyle
      ]}
      {...otherProps}
    >
      {Icon && <Icon color={textColor} />}
      <Text
        style={[
          GlobalStyles.subheading,
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

export default Badge;
