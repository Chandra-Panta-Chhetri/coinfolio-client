import React from "react";
import { Text, useTheme } from "react-native-paper";
import { StyleSheet } from "react-native";
import { GLOBAL_CONSTANTS } from "../constants";

const OutlinedText = ({ text, ...otherProps }) => {
  const { colors } = useTheme();

  return (
    <Text {...otherProps} style={[STYLES.container, { borderColor: colors.text }, otherProps.style]}>
      {text}
    </Text>
  );
};

const STYLES = StyleSheet.create({
  container: {
    borderRadius: GLOBAL_CONSTANTS.BORDER_RADIUS,
    paddingHorizontal: 5,
    textAlign: "center",
    borderWidth: 1
  }
});

export default OutlinedText;
