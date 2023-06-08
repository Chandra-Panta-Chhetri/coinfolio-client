import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { TYPOGRAPHY } from "../../../styles";
import { GLOBAL_CONSTANTS } from "../../../constants";
import { isNullOrUndefined } from "../../../utils";

const MoreOptionsIndicator = ({ selectedOptionLabel }) => {
  const { colors } = useTheme();

  return (
    <View style={STYLES.container}>
      {!isNullOrUndefined(selectedOptionLabel) ? <Text style={STYLES.label}>{selectedOptionLabel}</Text> : null}
      <MaterialIcons
        name="keyboard-arrow-right"
        size={GLOBAL_CONSTANTS.ICON_SIZE}
        color={colors?.primary}
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
