import React from "react";
import { Card } from "react-native-paper";
import { StyleSheet } from "react-native";
import { Skeleton } from "../../../../shared-components";
import { GLOBAL_STYLES } from "../../../../styles";
import { GLOBAL_CONSTANTS } from "../../../../constants";

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
    marginRight: GLOBAL_CONSTANTS.MD_MARGIN,
    width: 125
  },
  symbol: {
    ...GLOBAL_STYLES.borderRadius,
    width: 50,
    height: 10,
    marginTop: GLOBAL_CONSTANTS.MD_MARGIN
  },
  price: {
    ...GLOBAL_STYLES.borderRadius,
    width: 100,
    height: 10,
    marginTop: GLOBAL_CONSTANTS.MD_MARGIN
  },
  icon: {
    ...GLOBAL_STYLES.iconRoundness,
    ...GLOBAL_STYLES.iconSize
  }
});

export default TopCoinSkeleton;
