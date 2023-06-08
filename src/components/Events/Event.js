import React from "react";
import { StyleSheet, View } from "react-native";
import { TYPOGRAPHY, GLOBAL_STYLES } from "../../styles";
import { Card, Text } from "react-native-paper";
import TouchableNativeFeedback from "../TouchableNativeFeedback";
import Chip from "../Chip";
import IconImage from "../IconImage";
import { useNavigation } from "@react-navigation/native";
import { GLOBAL_CONSTANTS } from "../../constants";
import Skeleton from "../Skeleton";
import SCREEN_NAMES from "../../navigators/screen-names";

function Event({ event, index }) {
  const navigation = useNavigation();
  const goToEventDetails = () => navigation?.navigate(SCREEN_NAMES.EVENT_DETAILS, { eventName: event?.title });

  return (
    <TouchableNativeFeedback
      viewContainerStyle={index !== 0 ? STYLES.androidContainer : null}
      onPress={goToEventDetails}
    >
      <Card style={STYLES.cardContainer}>
        <Card.Content>
          <View style={STYLES.iconCoinLabel}>
            <IconImage
              source={{
                uri: event?.coins[0]?.iconURL
              }}
            />
            <View style={STYLES.coinLabel}>
              <View style={STYLES.coinsInvolvedContainer}>
                <Text style={[TYPOGRAPHY.body1]} numberOfLines={1}>
                  {event?.coins[0]?.fullname}
                  {event?.coins?.length > 1 ? ` + ${event?.coins?.length - 1}` : ""}
                </Text>
              </View>
              <Chip label={event?.category} containerStyle={STYLES.category} />
            </View>
          </View>
          <View style={STYLES.infoContainer}>
            <Text style={TYPOGRAPHY.caption} numberOfLines={1}>
              {new Date(event?.date).toDateString()}
              {event.can_occur_before ? " (or earlier)" : null}
            </Text>
            <Text numberOfLines={1} style={STYLES.title}>
              {event?.title}
            </Text>
          </View>
        </Card.Content>
      </Card>
    </TouchableNativeFeedback>
  );
}

Event.Skeleton = ({ containerStyle }) => (
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
        <Skeleton style={STYLES.skeletonTitle} />
      </View>
    </Card.Content>
  </Card>
);

const STYLES = StyleSheet.create({
  androidContainer: {
    marginTop: GLOBAL_CONSTANTS.MD_MARGIN
  },
  cardContainer: {
    borderRadius: GLOBAL_CONSTANTS.BORDER_RADIUS
  },
  infoContainer: {
    marginTop: GLOBAL_CONSTANTS.MD_MARGIN
  },
  iconCoinLabel: { flexDirection: "row", alignItems: "center" },
  coinLabel: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1
  },
  coinsInvolvedContainer: {
    flexDirection: "row",
    flex: 1,
    marginLeft: GLOBAL_CONSTANTS.SM_MARGIN,
    flex: 1,
    alignItems: "center"
  },
  category: {
    paddingHorizontal: 10,
    paddingVertical: 2
  },
  title: {
    ...TYPOGRAPHY.subheading
  },
  icon: {
    ...GLOBAL_STYLES.iconSize,
    borderRadius: GLOBAL_CONSTANTS.ICON_SIZE
  },
  skeletonTitle: {
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
  }
});

export default Event;
