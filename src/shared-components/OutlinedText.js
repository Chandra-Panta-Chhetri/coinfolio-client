import React from "react";
import { Text, useTheme } from "react-native-paper";
import { StyleSheet } from "react-native";
import { GLOBAL_STYLES } from "../styles";

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
    ...GLOBAL_STYLES.borderRadius,
    paddingHorizontal: 5,
    textAlign: "center",
    borderWidth: 1
  }
});

export default OutlinedText;
