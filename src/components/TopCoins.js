import React from "react";
import { StyleSheet, View, TouchableOpacity, FlatList } from "react-native";
import { Card, Paragraph, Avatar } from "react-native-paper";
import HeadingWithSeeAll from "./HeadingWithSeeAll";
import { withNavigation } from "@react-navigation/compat";

const dummyData = [
  {
    ticker: "BTC",
    price: 69230.24,
    percentChange: -4.25,
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"
  },
  {
    ticker: "LTC",
    price: 400,
    percentChange: +7.0,
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/2.png"
  },
  {
    ticker: "ETH",
    price: 4800.24,
    percentChange: -2.25,
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png"
  },
  {
    ticker: "BNB",
    price: 800.24,
    percentChange: -10.25,
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png"
  },
  {
    ticker: "USDT",
    price: 1,
    percentChange: 3.25,
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/825.png"
  }
];

const TopCoin = ({ item, navigation }) => (
  <TouchableOpacity activeOpacity={0.7}>
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

const TopCoins = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <HeadingWithSeeAll headingTitle="Top Coins" onSeeAllBtnPress={() => {}} />
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.topCoinCards}
        data={dummyData}
        keyExtractor={(tm) => tm.ticker}
        renderItem={(props) => <TopCoin {...props} navigation={navigation} />}
        listKey="TopCoinsList"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10
  },
  topCoinCards: {
    marginTop: 10
  },
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

export default withNavigation(TopCoins);
