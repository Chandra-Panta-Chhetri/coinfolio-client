import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { TYPOGRAPHY } from "../../../styles";

const MoreOptionsIndicator = ({ selectedOption }) => {
  const { colors } = useTheme();

  return (
    <View style={STYLES.container}>
      {selectedOption ? (
        <Text style={STYLES.label}>{selectedOption}</Text>
      ) : null}
      <MaterialIcons
        name="keyboard-arrow-right"
        size={25}
        color={colors.primary}
        style={TYPOGRAPHY.textAlignCenter}
      />
    </View>
  );
};

const STYLES = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end"
  },
  label: {
    ...TYPOGRAPHY.body1,
    width: "75%",
    textAlign: "right"
  }
});

export default MoreOptionsIndicator;
