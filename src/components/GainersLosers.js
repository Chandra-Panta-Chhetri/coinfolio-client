import React from "react";
import { StyleSheet, View, TouchableOpacity, FlatList } from "react-native";
import { Card, Paragraph, Avatar } from "react-native-paper";
import HeadingWithSeeAll from "./HeadingWithSeeAll";
import { withNavigation } from "@react-navigation/compat";

const dummyData = [
  {
    fullName: "Bitcoin",
    ticker: "BTC",
    price: 69230.24,
    percentChange: 4.25,
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"
  },
  {
    fullName: "Ethereum",
    ticker: "ETH",
    price: 4800.24,
    percentChange: -2.25,
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png"
  },
  {
    fullName: "Litecoin",
    ticker: "LTC",
    price: 400,
    percentChange: 7,
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/2.png"
  },
  {
    fullName: "Binance Coin",
    ticker: "BNB",
    price: 800.24,
    percentChange: -10.25,
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png"
  }
];

const GainerLoser = ({ item, navigation }) => (
  <TouchableOpacity activeOpacity={0.7}>
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
            <Paragraph style={styles.gainerLoserPrice}>${item.price}</Paragraph>
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

const GainersLosers = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <HeadingWithSeeAll
        headingTitle="Gainers & Losers"
        onSeeAllBtnPress={() => {}}
      />
      <FlatList
        contentContainerStyle={styles.gainersLosersCards}
        data={dummyData}
        keyExtractor={(gl) => gl.ticker}
        renderItem={(props) => (
          <GainerLoser {...props} navigation={navigation} />
        )}
        scrollEnabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10
  },
  gainersLosersCards: { marginTop: 10 },
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
    color: "lightgreen",
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

export default withNavigation(GainersLosers);
