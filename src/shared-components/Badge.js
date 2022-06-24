import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { COLORS, GLOBAL_CONSTANTS } from "../constants";
import TouchableNativeFeedback from "./TouchableNativeFeedback";

const Badge = ({ label, onPress, containerStyle = {} }) => {
  const { colors, dark: isDarkMode } = useTheme();

  return (
    <TouchableNativeFeedback viewContainerStyle={containerStyle} onPress={onPress}>
      <View style={[STYLES.container, { backgroundColor: isDarkMode ? colors.border : COLORS.LIGHT_GREY }]}>
        <Text>{label}</Text>
      </View>
    </TouchableNativeFeedback>
  );
};

const STYLES = StyleSheet.create({
  container: {
    borderRadius: GLOBAL_CONSTANTS.BORDER_RADIUS,
    padding: 7,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default Badge;
