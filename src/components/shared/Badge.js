import React from "react";
import { useTheme, Text } from "react-native-paper";
import GlobalStyles from "../../GlobalStyles";
import PressableView from "./PressableView";

const Badge = ({
  isActive = false,
  containerStyle = {},
  label,
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

  return (
    <PressableView
      viewStyle={[
        GlobalStyles.iconRoundness,
        isActive ? activeStyles : inactiveStyles,
        containerStyle
      ]}
      {...otherProps}
    >
      <Text
        style={[
          GlobalStyles.subheading,
          {
            color: isActive ? activeStyles.color : inactiveStyles.color
          }
        ]}
      >
        {label}
      </Text>
    </PressableView>
  );
};

export default Badge;
