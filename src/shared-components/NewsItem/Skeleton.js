import React from "react";
import { StyleSheet, View } from "react-native";
import { Card } from "react-native-paper";
import { GLOBAL_STYLES } from "../../styles";
import Skeleton from "../Skeleton";

const NewsItemSkeleton = ({ containerStyle }) => (
  <Card style={[GLOBAL_STYLES.borderRadius, containerStyle]}>
    <Card.Content>
      <Skeleton style={STYLES.titleSkeleton} />
      <View style={STYLES.dateSourceContainer}>
        <Skeleton style={STYLES.subheadingSkeleton} count={2} />
      </View>
    </Card.Content>
  </Card>
);

const STYLES = StyleSheet.create({
  titleSkeleton: {
    height: 25,
    ...GLOBAL_STYLES.borderRadius
  },
  subheadingSkeleton: {
    height: 20,
    marginTop: 10,
    width: 100,
    ...GLOBAL_STYLES.borderRadius
  },
  dateSourceContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  }
});

export default NewsItemSkeleton;
