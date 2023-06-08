import React from "react";
import { GLOBAL_STYLES, TYPOGRAPHY } from "../../../styles";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { StyleSheet } from "react-native";

const NoActivePortfolio = () => (
  <View style={STYLES.noActivePortfolioContainer}>
    <Text style={[TYPOGRAPHY.headline, { textAlign: "center" }]}>Please select a portfolio from the menu</Text>
  </View>
);

const STYLES = StyleSheet.create({
  noActivePortfolioContainer: {
    ...GLOBAL_STYLES.screenContainer,
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default NoActivePortfolio;
