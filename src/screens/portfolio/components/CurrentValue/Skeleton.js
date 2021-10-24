import React from "react";
import { StyleSheet, View } from "react-native";
import { Card } from "react-native-paper";
import { GLOBAL_STYLES } from "../../../../styles";
import { Skeleton } from "../../../../shared-components";

const CurrentValueSkeleton = () => (
  <Card style={styles.container}>
    <Card.Content>
      <Skeleton style={styles.subheadingSkeleton} />
      <View style={styles.rowFlexbox}>
        <Skeleton style={styles.valueSkeleton} />
        <Skeleton style={styles.percentSkeleton} />
      </View>
      <Skeleton style={styles.subheadingSkeleton} />
    </Card.Content>
  </Card>
);

const styles = StyleSheet.create({
  container: {
    ...GLOBAL_STYLES.borderRadius,
    ...GLOBAL_STYLES.componentContainer
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
    ...GLOBAL_STYLES.borderRadius,
    height: 20,
    marginBottom: 10,
    width: "35%"
  },
  rowFlexbox: {
    flexDirection: "row",
    marginBottom: 10,
    justifyContent: "space-between"
  }
});

export default CurrentValueSkeleton;
