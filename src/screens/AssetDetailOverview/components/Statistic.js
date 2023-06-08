import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { TYPOGRAPHY } from "../../../styles";
import { GLOBAL_CONSTANTS } from "../../../constants";

const Statistic = ({ label, value }) => (
  <View key={label} style={STYLES.statistic}>
    <Text style={TYPOGRAPHY.body1} numberOfLines={1}>
      {label}
    </Text>
    <Text style={TYPOGRAPHY.body1} numberOfLines={1}>
      {value}
    </Text>
  </View>
);

const STYLES = StyleSheet.create({
  statistic: {
    marginBottom: GLOBAL_CONSTANTS.SM_MARGIN
  }
});

export default Statistic;
