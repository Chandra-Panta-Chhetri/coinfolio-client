import React from "react";
import { StyleSheet, View } from "react-native";
import { GLOBAL_STYLES } from "../../styles";
import Skeleton from "../Skeleton";
import { Card } from "react-native-paper";
import { GLOBAL_CONSTANTS } from "../../constants";

const EventItemSkeleton = ({ containerStyle }) => (
  <Card style={[containerStyle, STYLES.cardContainer]}>
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
    marginTop: GLOBAL_CONSTANTS.MD_MARGIN
  },
  cardContainer: {
    borderRadius: GLOBAL_CONSTANTS.BORDER_RADIUS
  },
  icon: {
    ...GLOBAL_STYLES.iconSize,
    borderRadius: GLOBAL_CONSTANTS.ICON_SIZE
  },
  title: {
    height: 15,
    width: "60%",
    borderRadius: GLOBAL_CONSTANTS.BORDER_RADIUS
  },
  date: {
    marginBottom: GLOBAL_CONSTANTS.SM_MARGIN,
    borderRadius: GLOBAL_CONSTANTS.BORDER_RADIUS,
    height: 15,
    width: "30%"
  },
  iconCoinLabel: {
    flexDirection: "row",
    alignItems: "center"
  },
  coinsInvolved: {
    height: 15,
    marginLeft: GLOBAL_CONSTANTS.MD_MARGIN,
    width: "30%",
    borderRadius: GLOBAL_CONSTANTS.BORDER_RADIUS
  },
  label: {
    height: 15,
    width: "50%",
    borderRadius: GLOBAL_CONSTANTS.BORDER_RADIUS
  },
  coinLabel: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1
  }
});

export default EventItemSkeleton;
