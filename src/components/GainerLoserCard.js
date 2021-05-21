import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Card, Paragraph, Avatar } from "react-native-paper";

const GainerLoserCard = ({ item, navigation }) => {
  return (
    <TouchableOpacity activeOpacity={0.6}>
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
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  gainerLoserCard: {
    marginBottom: 10,
    borderRadius: 13
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
