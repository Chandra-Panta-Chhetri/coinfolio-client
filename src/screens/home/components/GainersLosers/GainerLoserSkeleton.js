import React from "react";
import { StyleSheet, View } from "react-native";
import { Card } from "react-native-paper";
import { GLOBAL_STYLES } from "../../../../styles";
import { Skeleton } from "../../../../shared-components";

const GainerLoserSkeleton = ({ containerStyle }) => (
  <Card style={[containerStyle, GLOBAL_STYLES.borderRadius]}>
    <Card.Content style={styles.cardBody}>
      <Skeleton style={styles.icon} />
      <View style={styles.infoContainer}>
        <View style={styles.rowFlexbox}>
          <Skeleton style={styles.fullNamePrice} />
        </View>
        <View style={styles.rowFlexbox}>
          <Skeleton style={styles.symbolPercent} />
        </View>
      </View>
    </Card.Content>
  </Card>
);

const styles = StyleSheet.create({
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
