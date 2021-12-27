import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { Header, Filters, OverviewItem } from "./components";
import { GLOBAL_STYLES } from "../../styles";
import { useTheme } from "react-native-paper";

import dummydata from "../../redux/portfolio/dummydata.json";

const MARKETS = [
  {
    iconUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
    rank: 1,
    symbol: "BTC",
    marketCap: 123032,
    sparkLine: dummydata.data.prices.week,
    price: 64000,
    percentChange: 2.3
  },
  {
    iconUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png",
    rank: 2,
    symbol: "ETH",
    marketCap: 23032,
    sparkLine: dummydata.data.prices.week,
    price: 4000,
    percentChange: -5.2
  }
];

const MarketOverviewScreen = ({ markets = MARKETS }) => {
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
      data={markets}
      keyExtractor={(m) => m.rank}
      ListHeaderComponentStyle={[STYLES.listHeader, { backgroundColor: colors.background }]}
      stickyHeaderIndices={[0]}
      renderItem={({ item, index }) => (
        <OverviewItem item={item} containerStyle={{ marginBottom: index !== markets.length - 1 ? 6 : 0 }} />
      )}
    />
  );
};

const STYLES = StyleSheet.create({
  listHeader: {
    marginBottom: 10
  }
});

export default MarketOverviewScreen;
