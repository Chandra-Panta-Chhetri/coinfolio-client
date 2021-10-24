import React from "react";
import { Card } from "react-native-paper";
import { StyleSheet } from "react-native";
import { Skeleton } from "../../../../shared-components";
import { GLOBAL_STYLES } from "../../../../styles";

const TopCoinSkeleton = () => (
  <Card style={STYLES.cardContainer}>
    <Card.Content>
      <Skeleton style={STYLES.icon} />
      <Skeleton style={STYLES.symbol} />
      <Skeleton style={STYLES.price} count={2} />
    </Card.Content>
  </Card>
);

const STYLES = StyleSheet.create({
  cardContainer: {
    ...GLOBAL_STYLES.borderRadius,
    marginRight: 10,
    width: 125
  },
  symbol: {
    ...GLOBAL_STYLES.borderRadius,
    width: 50,
    height: 10,
    marginTop: 10
  },
  price: {
    ...GLOBAL_STYLES.borderRadius,
    width: 100,
    height: 10,
    marginTop: 10
  },
  icon: {
    ...GLOBAL_STYLES.iconRoundness,
    ...GLOBAL_STYLES.iconSize
  }
});

export default TopCoinSkeleton;
