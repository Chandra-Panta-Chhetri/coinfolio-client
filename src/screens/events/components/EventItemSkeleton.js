import React from "react";
import { StyleSheet, View } from "react-native";
import { GLOBAL_STYLES } from "../../../styles";
import { Skeleton } from "../../../shared-components";
import { Card } from "react-native-paper";

const EventDetailSkeleton = ({ containerStyle }) => (
  <Card style={[containerStyle, GLOBAL_STYLES.borderRadius]}>
    <Card.Content>
      <View style={STYLES.iconCoinLabel}>
        <Skeleton style={STYLES.icon} />
        <View style={STYLES.coinLabel}>
          <Skeleton style={STYLES.coinsInvolved} />
          <Skeleton style={STYLES.label} />
        </View>
      </View>
      <View style={STYLES.infoContainer}>
        <Skeleton style={STYLES.date} />
        <Skeleton style={STYLES.title} />
      </View>
    </Card.Content>
  </Card>
);

const STYLES = StyleSheet.create({
  infoContainer: {
    marginTop: 10
  },
  icon: {
    ...GLOBAL_STYLES.iconSize,
    ...GLOBAL_STYLES.iconRoundness
  },
  title: {
    height: 15,
    width: "60%",
    ...GLOBAL_STYLES.borderRadius
  },
  date: {
    height: 15,
    width: "30%",
    marginBottom: 5,
    ...GLOBAL_STYLES.borderRadius
  },
  iconCoinLabel: {
    flexDirection: "row",
    alignItems: "center"
  },
  coinsInvolved: {
    height: 15,
    marginLeft: 10,
    width: "30%",
    ...GLOBAL_STYLES.borderRadius
  },
  label: {
    height: 15,
    width: "50%",
    ...GLOBAL_STYLES.borderRadius
  },
  coinLabel: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1
  }
});

export default EventDetailSkeleton;
