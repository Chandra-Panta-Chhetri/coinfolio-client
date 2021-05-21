import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Card, Paragraph, Avatar } from "react-native-paper";

const TopCoinCard = ({ item, navigation }) => {
  return (
    <TouchableOpacity activeOpacity={0.6}>
      <Card style={styles.topCoinCard}>
        <Card.Content>
          <Avatar.Image
            size={30}
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
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  topCoinCard: {
    marginRight: 10,
    borderRadius: 13,
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
  }
});

export default TopCoinCard;
