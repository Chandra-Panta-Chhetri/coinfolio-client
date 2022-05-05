import React from "react";
import { ScrollView } from "react-native";
import { GLOBAL_STYLES } from "../../styles";
import { GlobalMarketSummary, ShortcutIcons, TopCoins, GainersLosers, NewsSummaries } from "./components";

const HomeScreen = () => (
  <ScrollView contentContainerStyle={GLOBAL_STYLES.screenContainer} showsVerticalScrollIndicator={false}>
    <GlobalMarketSummary />
    <ShortcutIcons />
    <TopCoins />
    <GainersLosers />
    <NewsSummaries />
  </ScrollView>
);

export default HomeScreen;
