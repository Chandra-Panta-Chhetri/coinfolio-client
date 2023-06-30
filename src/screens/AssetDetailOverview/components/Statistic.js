import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { TYPOGRAPHY } from "../../../styles";
import { GLOBAL_CONSTANTS } from "../../../constants";
import { formatNum } from "../../../utils";

const formatValue = (labelKey, rawValue) => {
  switch (labelKey) {
    case "Market Cap":
    case "Volume 24h":
    case "All Time High":
      return `$${formatNum(rawValue, 0)}`;
    default:
      return rawValue;
  }
};

const Statistic = ({ label, value }) => (
  <View key={label} style={STYLES.statistic}>
    <Text style={TYPOGRAPHY.body1} numberOfLines={1}>
      {label}
    </Text>
    <Text style={TYPOGRAPHY.body1} numberOfLines={1}>
      {formatValue(label, value)}
    </Text>
  </View>
);

const STYLES = StyleSheet.create({
  statistic: {
    marginBottom: GLOBAL_CONSTANTS.SM_MARGIN
  }
});

export default Statistic;
