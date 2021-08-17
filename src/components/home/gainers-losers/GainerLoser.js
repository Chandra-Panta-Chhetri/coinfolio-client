import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Paragraph, Avatar } from "react-native-paper";
import CONSTANTS from "../../../Constants";
import TouchableNativeOpacity from "../../shared/TouchableNativeOpacity";

const GainerLoser = ({ item, navigation }) => {
  return (
    <TouchableNativeOpacity
      activeOpacity={CONSTANTS.SHARED.TOUCHABLE_ACTIVE_OPACITY}
      viewContainerStyle={styles.androidContainer}
    >
      <Card style={styles.gainerLoserCard}>
        <Card.Content style={styles.gainerLoserCardBody}>
          <Avatar.Image
            size={CONSTANTS.SHARED.AVATAR_IMAGE_SIZE}
            source={{
              uri: item.image
            }}
          />
          <View style={styles.gainerLoserInfoContainer}>
            <View>
              <Paragraph style={styles.gainerLoserFullName}>
                {item.fullName}
              </Paragraph>
              <Paragraph style={styles.gainerLoserTicker}>
                {item.ticker}
              </Paragraph>
            </View>
            <View style={styles.priceAndPercent}>
              <Paragraph style={styles.gainerLoserPrice}>
                ${item.price}
              </Paragraph>
              <Paragraph style={styles.gainerLoserPercent}>
                {item.percentChange > 0 && "+"}
                {item.percentChange}%
              </Paragraph>
            </View>
          </View>
        </Card.Content>
      </Card>
    </TouchableNativeOpacity>
  );
};

const styles = StyleSheet.create({
  gainerLoserCard: {
    borderRadius: CONSTANTS.SHARED.BORDER_RADIUS
  },
  androidContainer: {
    marginBottom: 10
  },
  gainerLoserCardBody: {
    flexDirection: "row",
    alignItems: "center"
  },
  gainerLoserFullName: {
    fontWeight: "bold",
    fontSize: 18
  },
  gainerLoserTicker: {
    color: "darkgray",
    fontWeight: "bold",
    fontSize: 13
  },
  gainerLoserPrice: {
    fontWeight: "bold",
    fontSize: 18
  },
  gainerLoserPercent: {
    color: "green",
    fontSize: 13
  },
  gainerLoserInfoContainer: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    marginLeft: 10
  },
  priceAndPercent: {
    alignItems: "flex-end"
  }
});

export default GainerLoser;
