import React from "react";
import { FlatList } from "react-native";
import { GLOBAL_STYLES } from "../../styles";
import {
  GlobalMarketSummary,
  ShortcutIcons,
  TopCoins,
  GainersLosers,
  NewsSummaries
} from "./components";

const HomeScreen = () => (
  <FlatList
    contentContainerStyle={GLOBAL_STYLES.screenContainer}
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
