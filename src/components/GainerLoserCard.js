import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Paragraph, Avatar } from "react-native-paper";
import TouchableNativeOpacity from "./TouchableNativeOpacity";

const GainerLoserCard = ({ item, navigation }) => {
  return (
    <TouchableNativeOpacity
      activeOpacity={0.6}
      viewContainerStyle={styles.androidContainer}
    >
      <Card style={styles.gainerLoserCard}>
        <Card.Content style={styles.gainerLoserCardBody}>
          <Avatar.Image
            size={35}
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
    borderRadius: 13
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

export default GainerLoserCard;
