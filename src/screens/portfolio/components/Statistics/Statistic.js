import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { GLOBAL_CONSTANTS } from "../../../../constants";
import { Skeleton } from "../../../../components";
import { TYPOGRAPHY } from "../../../../styles";
import { formatPercent, getStylesBasedOnSign, isNullOrUndefined } from "../../../../utils";

function Statistic({ title, value, percentChange, width = "100%" }) {
  return (
    <View style={{ width }}>
      <Text style={TYPOGRAPHY.subheading}>{title}</Text>
      <View style={STYLES.statContainer}>
        <Text style={TYPOGRAPHY.title}>{value}</Text>
        {isNullOrUndefined(percentChange) ? null : (
          <Text style={[TYPOGRAPHY.subheading, getStylesBasedOnSign(percentChange)]}>
            {formatPercent(percentChange)}
          </Text>
        )}
      </View>
    </View>
  );
}

Statistic.Skeleton = ({ width = "100%" }) => (
  <View style={{ width, marginBottom: GLOBAL_CONSTANTS.LG_MARGIN }}>
    <Skeleton style={STYLES.titleSkeleton} />
    <Skeleton style={STYLES.valueSkeleton} />
  </View>
);

const STYLES = StyleSheet.create({
  statContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  valueSkeleton: {
    borderRadius: GLOBAL_CONSTANTS.BORDER_RADIUS,
    height: 25,
    width: "65%"
  },
  titleSkeleton: {
    marginBottom: GLOBAL_CONSTANTS.MD_MARGIN,
    borderRadius: GLOBAL_CONSTANTS.BORDER_RADIUS,
    height: 25,
    width: "50%"
  }
});

export default Statistic;
