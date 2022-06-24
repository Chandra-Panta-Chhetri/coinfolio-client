import React from "react";
import { StyleSheet, View } from "react-native";
import { Card } from "react-native-paper";
import { GLOBAL_CONSTANTS } from "../../constants";
import { GLOBAL_STYLES } from "../../styles";
import Skeleton from "../Skeleton";

const NewsItemSkeleton = ({ containerStyle }) => (
  <Card style={[STYLES.cardContainer, containerStyle]}>
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
    height: 35,
    borderRadius: GLOBAL_CONSTANTS.BORDER_RADIUS
  },
  subheadingSkeleton: {
    height: 25,
    marginTop: GLOBAL_CONSTANTS.MD_MARGIN,
    width: "30%",
    borderRadius: GLOBAL_CONSTANTS.BORDER_RADIUS
  },
  dateSourceContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  cardContainer: {
    borderRadius: GLOBAL_CONSTANTS.BORDER_RADIUS
  }
});

export default NewsItemSkeleton;
