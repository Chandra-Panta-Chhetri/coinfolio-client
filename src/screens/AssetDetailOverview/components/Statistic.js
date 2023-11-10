import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { TYPOGRAPHY } from "../../../styles";
import { GLOBAL_CONSTANTS } from "../../../constants";
import { formatPrice } from "../../../utils";

const formatValue = (labelKey, rawValue, selectedCurrency) => {
  switch (labelKey) {
    case "Market Cap":
    case "Volume 24h":
      return formatPrice(rawValue, false, selectedCurrency, 0);
    case "All Time High":
      return formatPrice(rawValue, false, selectedCurrency);
    default:
      return rawValue;
  }
};

const Statistic = ({ label, value, selectedCurrency }) => (
  <View style={STYLES.statistic}>
    <Text style={TYPOGRAPHY.body1} numberOfLines={1}>
      {label}
    </Text>
    <Text style={TYPOGRAPHY.body1} numberOfLines={1}>
      {formatValue(label, value, selectedCurrency)}
    </Text>
  </View>
);

const STYLES = StyleSheet.create({
  statistic: {
    marginBottom: GLOBAL_CONSTANTS.SM_MARGIN
  }
});

export default Statistic;
