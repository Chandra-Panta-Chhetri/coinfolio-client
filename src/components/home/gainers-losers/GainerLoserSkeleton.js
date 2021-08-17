import React from "react";
import { StyleSheet, View } from "react-native";
import { Card } from "react-native-paper";
import CONSTANTS from "../../../Constants";
import Skeleton from "../../shared/Skeleton";

const GainerLoserSkeleton = () => (
  <Card style={styles.cardContainer}>
    <Card.Content style={styles.cardBody}>
      <Skeleton style={styles.iconSkeleton} />
      <View style={styles.infoContainer}>
        <View style={styles.rowFlexbox}>
          <Skeleton style={styles.fullNamePriceSkeleton} />
        </View>
        <View style={styles.rowFlexbox}>
          <Skeleton style={styles.symbolPercentSkeleton} />
        </View>
      </View>
    </Card.Content>
  </Card>
);

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 10,
    borderRadius: CONSTANTS.SHARED.BORDER_RADIUS
  },
  cardBody: {
    flexDirection: "row",
    alignItems: "center"
  },
  iconSkeleton: {
    borderRadius: 35,
    width: 35,
    height: 35
  },
  infoContainer: {
    flex: 1,
    marginLeft: 10
  },
  fullNamePriceSkeleton: {
    height: 15,
    borderRadius: 6,
    flex: 1
  },
  symbolPercentSkeleton: {
    height: 15,
    borderRadius: 6,
    marginTop: 10,
    flex: 1
  },
  rowFlexbox: {
    flexDirection: "row"
  }
});

export default GainerLoserSkeleton;
