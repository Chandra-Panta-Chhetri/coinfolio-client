import React from "react";
import GlobalMarketSummary from "../components/home/GlobalMarketSummary";
import ShortcutIcons from "../components/home/ShortcutIcons";
import TopCoins from "../components/home/top-coins/TopCoins";
import GainersLosers from "../components/home/gainers-losers/GainersLosers";
import NewsSummaries from "../components/home/NewsSummaries";
import { FlatList } from "react-native";
import GlobalStyles from "../GlobalStyles";

const HomeScreen = () => (
  <FlatList
    contentContainerStyle={GlobalStyles.screenContainer}
    showsVerticalScrollIndicator={false}
    ListHeaderComponent={
      <>
        <GlobalMarketSummary />
        <ShortcutIcons />
        <TopCoins />
        <GainersLosers />
        <NewsSummaries />
      </>
    }
    listKey="HomeScreenList"
  />
);

export default HomeScreen;
