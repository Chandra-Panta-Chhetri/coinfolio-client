import React from "react";
import { StyleSheet, View } from "react-native";
import { Card } from "react-native-paper";
import { GLOBAL_STYLES } from "../../../../styles";
import { Skeleton } from "../../../../shared-components";

const GainerLoserSkeleton = ({ containerStyle }) => (
  <Card style={[containerStyle, GLOBAL_STYLES.borderRadius]}>
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
  infoContainer: {
    flex: 1,
    marginLeft: 10
  },
  fullNamePrice: {
    ...GLOBAL_STYLES.borderRadius,
    height: 15,
    flex: 1
  },
  symbolPercent: {
    ...GLOBAL_STYLES.borderRadius,
    height: 15,
    marginTop: 10,
    flex: 1
  },
  rowFlexbox: {
    flexDirection: "row"
  },
  icon: {
    ...GLOBAL_STYLES.iconSize,
    ...GLOBAL_STYLES.iconRoundness
  }
});

export default GainerLoserSkeleton;
