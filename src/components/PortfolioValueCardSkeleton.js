import React from "react";
import { StyleSheet, View } from "react-native";
import { Card } from "react-native-paper";
import Skeleton from "./Skeleton";

const PortfolioValueCardSkeleton = () => (
  <Card>
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
  valueSkeleton: {
    height: 25,
    borderRadius: 6,
    width: "60%"
  },
  percentSkeleton: {
    height: 25,
    borderRadius: 6,
    width: "25%"
  },
  subheadingSkeleton: {
    height: 20,
    borderRadius: 6,
    marginBottom: 10,
    width: "35%"
  },
  rowFlexbox: {
    flexDirection: "row",
    marginBottom: 10,
    justifyContent: "space-between"
  }
});

export default PortfolioValueCardSkeleton;
