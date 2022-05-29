import React from "react";
import TouchableNativeFeedback from "./TouchableNativeFeedback";
import { AntDesign } from "@expo/vector-icons";
import { useTheme, Text } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { TYPOGRAPHY } from "../styles";

const TouchableOption = ({ isSelected = false, onSelect, label }) => {
  const { colors } = useTheme();

  return (
    <TouchableNativeFeedback onPress={onSelect}>
      <View style={STYLES.option}>
        <Text style={TYPOGRAPHY.body1}>{label}</Text>
        {isSelected && <AntDesign name="check" style={TYPOGRAPHY.body1} color={colors.text} />}
      </View>
    </TouchableNativeFeedback>
  );
};

const STYLES = StyleSheet.create({
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10
  }
});

export default TouchableOption;
