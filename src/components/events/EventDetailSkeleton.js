import React from "react";
import { StyleSheet, View } from "react-native";
import GlobalStyles from "../../GlobalStyles";
import Skeleton from "../shared/Skeleton";
import { Card } from "react-native-paper";

const EventDetailSkeleton = ({ containerStyle }) => (
  <Card style={[containerStyle, GlobalStyles.borderRadius]}>
    <Card.Content>
      <View style={styles.iconCoinLabel}>
        <Skeleton style={[GlobalStyles.iconSize, GlobalStyles.iconRoundness]} />
        <View style={styles.coinLabel}>
          <Skeleton style={[styles.coinsInvolved, GlobalStyles.borderRadius]} />
          <Skeleton style={[styles.label, GlobalStyles.borderRadius]} />
        </View>
      </View>
      <View style={styles.infoContainer}>
        <Skeleton style={[styles.date, GlobalStyles.borderRadius]} />
        <Skeleton style={[styles.title, GlobalStyles.borderRadius]} />
        <Skeleton style={[styles.description, GlobalStyles.borderRadius]} />
      </View>
    </Card.Content>
  </Card>
);

const styles = StyleSheet.create({
  infoContainer: {
    marginTop: 10
  },
  title: {
    height: 15,
    width: "60%"
  },
  date: {
    height: 15,
    width: "30%",
    marginBottom: 5
  },
  description: {
    height: 15,
    marginTop: 8,
    width: "100%"
  },
  iconCoinLabel: {
    flexDirection: "row",
    alignItems: "center"
  },
  coinsInvolved: {
    height: 15,
    marginLeft: 10,
    width: "30%"
  },
  label: {
    height: 15,
    width: "50%"
  },
  coinLabel: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1
  }
});

export default EventDetailSkeleton;
