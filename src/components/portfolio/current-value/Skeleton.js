import React from "react";
import { StyleSheet, View } from "react-native";
import { Card } from "react-native-paper";
import GlobalStyles from "../../../GlobalStyles";
import Skeleton from "../../shared/Skeleton";

const CurrentValueSkeleton = () => (
  <Card style={[GlobalStyles.borderRadius, GlobalStyles.componentContainer]}>
    <Card.Content>
      <Skeleton style={styles.subheadingSkeleton} />
      <View style={styles.rowFlexbox}>
        <Skeleton style={[styles.valueSkeleton, GlobalStyles.borderRadius]} />
        <Skeleton style={[styles.percentSkeleton, GlobalStyles.borderRadius]} />
      </View>
      <Skeleton
        style={[styles.subheadingSkeleton, GlobalStyles.borderRadius]}
      />
    </Card.Content>
  </Card>
);

const styles = StyleSheet.create({
  valueSkeleton: {
    height: 25,
    width: "60%"
  },
  percentSkeleton: {
    height: 25,
    width: "25%"
  },
  subheadingSkeleton: {
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
