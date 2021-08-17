import React from "react";
import { StyleSheet, View } from "react-native";
import { Card } from "react-native-paper";
import CONSTANTS from "../../../Constants";
import Skeleton from "../../shared/Skeleton";

const NewsItemSkeleton = () => (
  <Card style={styles.cardContainer}>
    <Card.Content style={styles.cardBody}>
      <View style={styles.infoContainer}>
        <View style={styles.rowFlexbox}>
          <Skeleton style={styles.titleSkeleton} />
        </View>
        <Skeleton style={styles.subheadingSkeleton} />
      </View>
      <Skeleton style={styles.imagePreviewSkeleton} />
    </Card.Content>
  </Card>
);

const styles = StyleSheet.create({
  cardBody: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  cardContainer: {
    marginBottom: 10,
    borderRadius: CONSTANTS.SHARED.BORDER_RADIUS
  },
  infoContainer: {
    flex: 1,
    marginRight: 15
  },
  titleSkeleton: {
    height: 25,
    borderRadius: 6,
    flex: 1
  },
  subheadingSkeleton: {
    height: 20,
    borderRadius: 6,
    marginTop: 10,
    width: 100
  },
  imagePreviewSkeleton: {
    width: 90,
    height: 90
  },
  rowFlexbox: {
    flexDirection: "row"
  }
});

export default NewsItemSkeleton;
