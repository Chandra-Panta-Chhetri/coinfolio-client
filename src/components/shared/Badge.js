import React from "react";
import { useTheme, Text } from "react-native-paper";
import GlobalStyles from "../../GlobalStyles";
import PressableView from "./PressableView";

const Badge = ({
  isActive = false,
  containerStyle = {},
  label = "",
  icon: Icon = null,
  ...otherProps
}) => {
  const { colors, dark: isDarkMode } = useTheme();
  const activeStyles = {
    backgroundColor: isDarkMode ? colors.text : colors.primary,
    color: isDarkMode ? colors.border : "white"
  };

  const inactiveStyles = {
    color: colors.text,
    backgroundColor: isDarkMode ? colors.border : "lightgrey"
  };

  const textColor = isActive ? activeStyles.color : inactiveStyles.color;

  return (
    <PressableView
      viewStyle={[
        GlobalStyles.iconRoundness,
        isActive ? activeStyles : inactiveStyles,
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
