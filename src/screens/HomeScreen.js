import React from "react";
import GlobalMarketSummary from "../components/home/GlobalMarketSummary";
import ShortcutIcons from "../components/home/ShortcutIcons";
import TopCoins from "../components/home/top-coins/TopCoins";
import GainersLosers from "../components/home/gainers-losers/GainersLosers";
import NewsSummary from "../components/home/news-summary/NewsSummary";
import { FlatList } from "react-native";
import GlobalStyles from "../GlobalStyles";

function HomeScreen() {
  return (
    <FlatList
      contentContainerStyle={GlobalStyles.screenPadding}
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

export default HomeScreen;
