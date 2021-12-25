import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Header, Filters } from "./components";
import { GLOBAL_STYLES, TYPOGRAPHY } from "../../styles";
import { Avatar, Text, useTheme } from "react-native-paper";
import { GLOBAL_CONSTANTS } from "../../constants";
import { formatNumBasedOnSignWorklet, getStylesBasedOnSign } from "../../utils";

const MARKETS = [
  {
    iconUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
    rank: 1,
    symbol: "BTC",
    marketCap: 123032,
    sparkLine: [],
    price: 64000,
    percentChange: 2.3
  },
  {
    iconUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png",
    rank: 2,
    symbol: "ETH",
    marketCap: 23032,
    sparkLine: [],
    price: 4000,
    percentChange: -5.2
  },
  {
    iconUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png",
    rank: 3,
    symbol: "ETH",
    marketCap: 23032,
    sparkLine: [],
    price: 4000,
    percentChange: -5.2
  },
  {
    iconUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png",
    rank: 4,
    symbol: "ETH",
    marketCap: 23032,
    sparkLine: [],
    price: 4000,
    percentChange: -5.2
  },
  {
    iconUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png",
    rank: 5,
    symbol: "ETH",
    marketCap: 23032,
    sparkLine: [],
    price: 4000,
    percentChange: -5.2
  },
  {
    iconUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png",
    rank: 6,
    symbol: "ETH",
    marketCap: 23032,
    sparkLine: [],
    price: 4000,
    percentChange: -5.2
  },
  {
    iconUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png",
    rank: 7,
    symbol: "ETH",
    marketCap: 23032,
    sparkLine: [],
    price: 4000,
    percentChange: -5.2
  },
  {
    iconUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png",
    rank: 8,
    symbol: "ETH",
    marketCap: 23032,
    sparkLine: [],
    price: 4000,
    percentChange: -5.2
  },
  {
    iconUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png",
    rank: 9,
    symbol: "ETH",
    marketCap: 23032,
    sparkLine: [],
    price: 4000,
    percentChange: -5.2
  },
  {
    iconUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png",
    rank: 10,
    symbol: "ETH",
    marketCap: 23032,
    sparkLine: [],
    price: 4000,
    percentChange: -5.2
  },
  {
    iconUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png",
    rank: 11,
    symbol: "ETH",
    marketCap: 23032,
    sparkLine: [],
    price: 4000,
    percentChange: -5.2
  },
  {
    iconUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png",
    rank: 12,
    symbol: "ETH",
    marketCap: 23032,
    sparkLine: [],
    price: 4000,
    percentChange: -5.2
  },
  {
    iconUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png",
    rank: 13,
    symbol: "ETH",
    marketCap: 23032,
    sparkLine: [],
    price: 4000,
    percentChange: -5.2
  }
];

const MarketOverviewScreen = () => {
  const { colors } = useTheme();

  return (
    <FlatList
      ListHeaderComponent={
        <>
          <Header />
          <Filters />
        </>
      }
      contentContainerStyle={GLOBAL_STYLES.screenContainer}
      showsVerticalScrollIndicator={false}
      data={MARKETS}
      keyExtractor={(m) => m.rank}
      ListHeaderComponentStyle={{ marginBottom: 10, backgroundColor: colors.background }}
      stickyHeaderIndices={[0]}
      renderItem={({ item, index }) => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: index !== MARKETS.length - 1 ? 6 : 0
          }}
        >
          <Avatar.Image
            size={GLOBAL_CONSTANTS.AVATAR_IMAGE_SIZE}
            source={{
              uri: item.iconUrl
            }}
          />
          <View style={{ flex: 1, marginLeft: 5 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={[
                  { borderWidth: 1, borderRadius: 4, padding: 3, marginRight: 5, textAlign: "center" },
                  TYPOGRAPHY.body1
                ]}
              >
                {item.rank}
              </Text>
              <Text numberOfLines={1} style={[TYPOGRAPHY.body2]}>
                {item.symbol}
              </Text>
            </View>
            <Text numberOfLines={1} style={[TYPOGRAPHY.body1]}>
              MCap - {item.marketCap}
            </Text>
          </View>
          <View style={{ flex: 1 }}></View>
          <View style={{ flex: 1, alignItems: "flex-end" }}>
            <Text style={[TYPOGRAPHY.body2]}>${item.price}</Text>
            <Text style={[getStylesBasedOnSign(item.percentChange), TYPOGRAPHY.body1]}>
              {formatNumBasedOnSignWorklet(item.percentChange)}%
            </Text>
          </View>
        </View>
      )}
    />
  );
};

const STYLES = StyleSheet.create({});

export default MarketOverviewScreen;
