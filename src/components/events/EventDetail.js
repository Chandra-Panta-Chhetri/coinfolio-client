import React from "react";
import { StyleSheet, View } from "react-native";
import GlobalStyles from "../../GlobalStyles";
import { Card, Avatar, Text } from "react-native-paper";
import TouchableNativeOpacity from "../shared/TouchableNativeOpacity";
import Badge from "../shared/Badge";
import CONSTANTS from "../../Constants";
import { MaterialIcons } from "@expo/vector-icons";

const EventDetail = ({ item, navigation, index }) => (
  <TouchableNativeOpacity
    viewContainerStyle={index !== 0 ? styles.androidContainer : null}
  >
    <Card style={GlobalStyles.borderRadius}>
      <Card.Content>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Avatar.Image
            size={CONSTANTS.SHARED.AVATAR_IMAGE_SIZE}
            source={{
              uri: item.coins[0].imageUrl
            }}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              flex: 1
            }}
          >
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                marginLeft: 7,
                flex: 1,
                alignItems: "center"
              }}
            >
              <Text style={[GlobalStyles.body1]} numberOfLines={1}>
                {item.coins[0].fullName}
                {item.coins.length > 1 ? ` + ${item.coins.length - 1}` : ""}
              </Text>
              {item.verified && (
                <MaterialIcons
                  name="verified"
                  size={15}
                  color="black"
                  style={{ marginLeft: 5 }}
                />
              )}
            </View>
            <Badge
              label={item.type.label}
              containerStyle={{
                paddingHorizontal: 10,
                paddingVertical: 2
              }}
              isHighlighted
              highlightedStyle={{
                color: "white",
                backgroundColor: item.type.backgroundColor
              }}
            />
          </View>
        </View>
        <View style={styles.infoContainer}>
          <Text style={[GlobalStyles.caption]} numberOfLines={1}>
            {new Date(item.date).toDateString()}
            {item.canOccurBefore && " (or earlier)"}
          </Text>
          <Text
            numberOfLines={1}
            style={[GlobalStyles.subheading, { marginBottom: 8 }]}
          >
            {item.title}
          </Text>
          <Text numberOfLines={2} style={[GlobalStyles.body1]}>
            {item.description}
          </Text>
        </View>
      </Card.Content>
    </Card>
  </TouchableNativeOpacity>
);

const styles = StyleSheet.create({
  androidContainer: {
    marginTop: 10
  },
  infoContainer: {
    marginTop: 10
  }
});

export default EventDetail;
