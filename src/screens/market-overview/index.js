import React from "react";
import { StyleSheet, View } from "react-native";
import { Header, Filters } from "./components";
import { GLOBAL_STYLES } from "../../styles";

const MarketOverviewScreen = () => {
  return (
    <View style={GLOBAL_STYLES.screenContainer}>
      <Header />
      <Filters />
    </View>
  );
};

const STYLES = StyleSheet.create({});

export default MarketOverviewScreen;
