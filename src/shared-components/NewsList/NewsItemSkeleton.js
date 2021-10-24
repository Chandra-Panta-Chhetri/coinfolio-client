import React from "react";
import { StyleSheet, View } from "react-native";
import { Card } from "react-native-paper";
import { GLOBAL_STYLES } from "../../styles";
import Skeleton from "../Skeleton";

const NewsItemSkeleton = ({ containerStyle }) => (
  <Card style={[GLOBAL_STYLES.borderRadius, containerStyle]}>
    <Card.Content style={STYLES.cardBody}>
      <View style={STYLES.infoContainer}>
        <View style={STYLES.rowFlexbox}>
          <Skeleton style={STYLES.titleSkeleton} />
        </View>
        <Skeleton style={STYLES.subheadingSkeleton} />
      </View>
      <Skeleton
        style={[GLOBAL_STYLES.imagePreview, GLOBAL_STYLES.borderRadius]}
      />
    </Card.Content>
  </Card>
);

const STYLES = StyleSheet.create({
  cardBody: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  infoContainer: {
    flex: 1,
    marginRight: 15
  },
  titleSkeleton: {
    height: 25,
    flex: 1,
    ...GLOBAL_STYLES.borderRadius
  },
  subheadingSkeleton: {
    height: 20,
    marginTop: 10,
    width: 100,
    ...GLOBAL_STYLES.borderRadius
  },
  rowFlexbox: {
    flexDirection: "row"
  }
});

export default NewsItemSkeleton;
