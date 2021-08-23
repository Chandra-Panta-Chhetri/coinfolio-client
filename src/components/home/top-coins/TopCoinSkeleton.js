import React from "react";
import { Card } from "react-native-paper";
import { StyleSheet } from "react-native";
import Skeleton from "../../shared/Skeleton";
import GlobalStyles from "../../../GlobalStyles";

const TopCoinSkeleton = () => {
  return (
    <Card style={[styles.cardContainer, GlobalStyles.borderRadius]}>
      <Card.Content>
        <Skeleton style={[GlobalStyles.iconRoundness, GlobalStyles.iconSize]} />
        <Skeleton style={[styles.symbolSkeleton, GlobalStyles.borderRadius]} />
        <Skeleton
          style={[styles.priceSkeleton, GlobalStyles.borderRadius]}
          count={2}
        />
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginRight: 10,
    width: 125
  },
  symbolSkeleton: { width: 50, height: 10, marginTop: 10 },
  priceSkeleton: { width: 100, height: 10, marginTop: 10 }
});

export default TopCoinSkeleton;
