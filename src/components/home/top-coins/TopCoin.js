import React from "react";
import { StyleSheet } from "react-native";
import { Card, Paragraph, Avatar } from "react-native-paper";
import CONSTANTS from "../../../Constants";
import TouchableNativeOpacity from "../../shared/TouchableNativeOpacity";

const TopCoin = ({ item, navigation }) => {
  return (
    <TouchableNativeOpacity
      activeOpacity={CONSTANTS.SHARED.TOUCHABLE_ACTIVE_OPACITY}
      viewContainerStyle={styles.androidContainer}
    >
      <Card style={styles.topCoinCard}>
        <Card.Content>
          <Avatar.Image
            size={CONSTANTS.SHARED.AVATAR_IMAGE_SIZE}
            source={{
              uri: item.image
            }}
          />
          <Paragraph style={styles.topCoinName}>{item.ticker}</Paragraph>
          <Paragraph style={styles.topCoinPrice}>${item.price}</Paragraph>
          <Paragraph style={styles.topCoinPercent}>
            {item.percentChange > 0 && "+"}
            {item.percentChange}%
          </Paragraph>
        </Card.Content>
      </Card>
    </TouchableNativeOpacity>
  );
};

const styles = StyleSheet.create({
  topCoinCard: {
    borderRadius: CONSTANTS.SHARED.BORDER_RADIUS,
    width: 125
  },
  topCoinName: {
    fontWeight: "bold",
    marginTop: 10
  },
  topCoinPrice: {
    color: "darkgray"
  },
  topCoinPercent: {
    color: "red",
    fontWeight: "bold",
    fontSize: 17,
    marginTop: 12
  },
  androidContainer: {
    marginRight: 10
  }
});

export default TopCoin;
