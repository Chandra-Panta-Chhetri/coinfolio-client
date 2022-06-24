import React from "react";
import { StyleSheet, View } from "react-native";
import { GLOBAL_STYLES, TYPOGRAPHY } from "../../../styles";
import { Card, Text, useTheme } from "react-native-paper";
import { TouchableNativeFeedback, Chip, IconImage } from "../../../shared-components";
import { useNavigation } from "@react-navigation/native";
import { GLOBAL_CONSTANTS } from "../../../constants";

const EventDetail = ({ event, index }) => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  return (
    <TouchableNativeFeedback
      viewContainerStyle={index !== 0 ? STYLES.androidContainer : null}
      onPress={() => navigation.navigate("EventDetails", { eventName: event.title })}
    >
      <Card style={STYLES.cardContainer}>
        <Card.Content>
          <View style={STYLES.iconCoinLabel}>
            <IconImage
              source={{
                uri: event.coins[0].iconURL
              }}
            />
            <View style={STYLES.coinLabel}>
              <View style={STYLES.coinsInvolvedContainer}>
                <Text style={[TYPOGRAPHY.body1]} numberOfLines={1}>
                  {event.coins[0].fullname}
                  {event.coins.length > 1 ? ` + ${event.coins.length - 1}` : ""}
                </Text>
              </View>
              <Chip label={event.category} containerStyle={STYLES.category} />
            </View>
          </View>
          <View style={STYLES.infoContainer}>
            <Text style={TYPOGRAPHY.caption} numberOfLines={1}>
              {new Date(event.date).toDateString()}
              {event.can_occur_before && " (or earlier)"}
            </Text>
            <Text numberOfLines={1} style={STYLES.title}>
              {event.title}
            </Text>
          </View>
        </Card.Content>
      </Card>
    </TouchableNativeFeedback>
  );
};

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
  }
});

export default EventDetail;
