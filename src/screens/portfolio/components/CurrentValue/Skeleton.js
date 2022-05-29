import React from "react";
import { StyleSheet, View } from "react-native";
import { Card } from "react-native-paper";
import { GLOBAL_STYLES } from "../../../../styles";
import { Skeleton } from "../../../../shared-components";

const CurrentValueSkeleton = () => (
  <Card style={STYLES.container}>
    <Card.Content>
      <Skeleton style={STYLES.subheadingSkeleton} />
      <View style={STYLES.rowFlexbox}>
        <Skeleton style={STYLES.valueSkeleton} />
        <Skeleton style={STYLES.percentSkeleton} />
      </View>
      <Skeleton style={STYLES.subheadingSkeleton} />
    </Card.Content>
  </Card>
);

const STYLES = StyleSheet.create({
  container: {
    ...GLOBAL_STYLES.borderRadius,
    ...GLOBAL_STYLES.lgMarginBottom
  },
  valueSkeleton: {
    ...GLOBAL_STYLES.borderRadius,
    height: 25,
    width: "60%"
  },
  percentSkeleton: {
    ...GLOBAL_STYLES.borderRadius,
    height: 25,
    width: "25%"
  },
  subheadingSkeleton: {
    ...GLOBAL_STYLES.mdMarginBottom,
    ...GLOBAL_STYLES.borderRadius,
    height: 20,
    width: "35%"
  },
  rowFlexbox: {
    ...GLOBAL_STYLES.mdMarginBottom,
    flexDirection: "row",
    justifyContent: "space-between"
  }
});

export default CurrentValueSkeleton;
