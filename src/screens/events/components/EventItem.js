import React from "react";
import { StyleSheet, View } from "react-native";
import { GLOBAL_STYLES, TYPOGRAPHY } from "../../../styles";
import { Card, Avatar, Text, useTheme } from "react-native-paper";
import { TouchableNativeFeedback, Badge } from "../../../shared-components";
import { GLOBAL_CONSTANTS } from "../../../constants";
import { useNavigation } from "@react-navigation/native";

const EventDetail = ({ event, index }) => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  return (
    <TouchableNativeFeedback
      viewContainerStyle={index !== 0 ? STYLES.androidContainer : null}
      onPress={() => navigation.navigate("EventDetails", { eventName: event.title })}
    >
      <Card style={GLOBAL_STYLES.borderRadius}>
        <Card.Content>
          <View style={STYLES.iconCoinLabel}>
            <Avatar.Image
              size={GLOBAL_CONSTANTS.AVATAR_IMAGE_SIZE}
              source={{
                uri: event.coins[0].iconURL
              }}
              style={STYLES.icon}
            />
            <View style={STYLES.coinLabel}>
              <View style={STYLES.coinsInvolvedContainer}>
                <Text style={[TYPOGRAPHY.body1]} numberOfLines={1}>
                  {event.coins[0].fullname}
                  {event.coins.length > 1 ? ` + ${event.coins.length - 1}` : ""}
                </Text>
              </View>
              <Badge label={event.category} containerStyle={STYLES.category} />
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
    marginTop: 10
  },
  infoContainer: {
    marginTop: 10
  },
  icon: {
    backgroundColor: "transparent"
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
    marginLeft: 7,
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
