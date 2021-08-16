import React from "react";
import GlobalMarketSummary from "../components/home/GlobalMarketSummary";
import ShortcutIcons from "../components/home/ShortcutIcons";
import TopCoins from "../components/home/top-coins/TopCoins";
import GainersLosers from "../components/home/gainers-losers/GainersLosers";
import NewsSummary from "../components/home/news-summary/NewsSummary";
import { StyleSheet, FlatList } from "react-native";

function HomeScreen() {
  return (
    <FlatList
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <>
          <GlobalMarketSummary />
          <ShortcutIcons />
          <TopCoins />
          <GainersLosers />
          <NewsSummary />
        </>
      }
      listKey="HomeScreenList"
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10
  }
});

export default HomeScreen;
