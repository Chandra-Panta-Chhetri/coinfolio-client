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
    borderRadius: GLOBAL_CONSTANTS.BORDER_RADIUS,
    marginRight: GLOBAL_CONSTANTS.MD_MARGIN,
    width: 125
  },
  symbol: {
    borderRadius: GLOBAL_CONSTANTS.BORDER_RADIUS,
    width: 50,
    height: 10,
    marginTop: GLOBAL_CONSTANTS.MD_MARGIN
  },
  price: {
    borderRadius: GLOBAL_CONSTANTS.BORDER_RADIUS,
    width: 100,
    height: 10,
    marginTop: GLOBAL_CONSTANTS.MD_MARGIN
  },
  icon: {
    borderRadius: GLOBAL_CONSTANTS.ICON_SIZE,
    ...GLOBAL_STYLES.iconSize
  }
});

export default TopCoinSkeleton;
