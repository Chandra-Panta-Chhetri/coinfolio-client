import React from "react";
import { StyleSheet, View } from "react-native";
import { Card } from "react-native-paper";
import { GLOBAL_STYLES } from "../../../../styles";
import { Skeleton } from "../../../../shared-components";
import { GLOBAL_CONSTANTS } from "../../../../constants";

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
    borderRadius: GLOBAL_CONSTANTS.BORDER_RADIUS,
    marginBottom: GLOBAL_CONSTANTS.LG_MARGIN
  },
  valueSkeleton: {
    borderRadius: GLOBAL_CONSTANTS.BORDER_RADIUS,
    height: 25,
    width: "60%"
  },
  percentSkeleton: {
    borderRadius: GLOBAL_CONSTANTS.BORDER_RADIUS,
    height: 25,
    width: "25%"
  },
  subheadingSkeleton: {
    marginBottom: GLOBAL_CONSTANTS.MD_MARGIN,
    borderRadius: GLOBAL_CONSTANTS.BORDER_RADIUS,
    height: 20,
    width: "35%"
  },
  rowFlexbox: {
    marginBottom: GLOBAL_CONSTANTS.MD_MARGIN,
    flexDirection: "row",
    justifyContent: "space-between"
  }
});

export default CurrentValueSkeleton;
