import React from "react";
import { TYPOGRAPHY } from "../../styles";
import { useTheme } from "react-native-paper";
import { View, Text, StyleSheet } from "react-native";

const PagingDots = ({ numOfDots = 0, activeDot, containerWidth = 0 }) => {
  const dots = Array(numOfDots).fill("1");
  const { colors, dark: isDarkMode } = useTheme();
  const activeDotStyles = {
    opacity: 1,
    color: isDarkMode ? colors?.primary : colors?.text
  };
  const nonActiveDotStyles = {
    opacity: isDarkMode ? 0.5 : 0.2,
    color: isDarkMode ? colors?.placeholder : colors?.text
  };

  return (
    <View style={[STYLES.pagingDots, { right: containerWidth / 2 }]}>
      {dots?.map((_, i) => (
        <Text key={i} style={[activeDot === i ? activeDotStyles : nonActiveDotStyles, TYPOGRAPHY.display1]}>
          &bull;
        </Text>
      ))}
    </View>
  );
};

const STYLES = StyleSheet.create({
  pagingDots: {
    position: "absolute",
    bottom: -11,
    flexDirection: "row"
  }
});

export default PagingDots;
