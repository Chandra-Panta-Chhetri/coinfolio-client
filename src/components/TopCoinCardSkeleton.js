import React from "react";
import { Card } from "react-native-paper";
import { StyleSheet } from "react-native";
import Skeleton from "./Skeleton";

const TopCoinCardSkeleton = () => {
  return (
    <Card style={styles.cardContainer}>
      <Card.Content>
        <Skeleton style={styles.iconSkeleton} />
        <Skeleton style={styles.symbolSkeleton} />
        <Skeleton style={styles.priceSkeleton} count={2} />
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginRight: 10,
    borderRadius: 13,
    width: 125
  },
  iconSkeleton: { borderRadius: 30, width: 30, height: 30 },
  symbolSkeleton: { borderRadius: 6, width: 50, height: 10, marginTop: 10 },
  priceSkeleton: { borderRadius: 6, width: 100, height: 10, marginTop: 10 }
});

export default TopCoinCardSkeleton;
