import React from "react";
import GlobalMarketSummary from "../components/GlobalMarketSummary";
import ShortcutIcons from "../components/ShortcutIcons";
import TopCoins from "../components/TopCoins";
import GainersLosers from "../components/GainersLosers";
import NewsSummary from "../components/NewsSummary";
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
