import React from "react";
import { StyleSheet, View } from "react-native";
import { Card } from "react-native-paper";
import { GLOBAL_STYLES } from "../../../../styles";
import { Skeleton } from "../../../../shared-components";
import { GLOBAL_CONSTANTS } from "../../../../constants";

const GainerLoserSkeleton = ({ containerStyle }) => (
  <Card style={[containerStyle, STYLES.cardContainer]}>
    <Card.Content style={STYLES.cardBody}>
      <Skeleton style={STYLES.icon} />
      <View style={STYLES.infoContainer}>
        <View style={STYLES.rowFlexbox}>
          <Skeleton style={STYLES.fullNamePrice} />
        </View>
        <View style={STYLES.rowFlexbox}>
          <Skeleton style={STYLES.symbolPercent} />
        </View>
      </View>
    </Card.Content>
  </Card>
);

const STYLES = StyleSheet.create({
  cardBody: {
    flexDirection: "row",
    alignItems: "center"
  },
  cardContainer: {
    borderRadius: GLOBAL_CONSTANTS.BORDER_RADIUS
  },
  infoContainer: {
    flex: 1,
    marginLeft: GLOBAL_CONSTANTS.MD_MARGIN
  },
  fullNamePrice: {
    borderRadius: GLOBAL_CONSTANTS.BORDER_RADIUS,
    height: 15,
    flex: 1
  },
  symbolPercent: {
    borderRadius: GLOBAL_CONSTANTS.BORDER_RADIUS,
    height: 15,
    marginTop: GLOBAL_CONSTANTS.MD_MARGIN,
    flex: 1
  },
  rowFlexbox: {
    flexDirection: "row"
  },
  icon: {
    ...GLOBAL_STYLES.iconSize,
    borderRadius: GLOBAL_CONSTANTS.ICON_SIZE
  }
});

export default GainerLoserSkeleton;
