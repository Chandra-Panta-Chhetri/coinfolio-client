import React, { useEffect } from "react";
import { FlatList } from "react-native";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Reanimated from "react-native-reanimated";
import { GLOBAL_STYLES, TYPOGRAPHY } from "../../styles";
import { useHiddenFABOnScroll } from "../../hooks";
import { HoldingsOverview, Allocations, Statistics } from "./components";
import { selectActivePortfolio, startPortfolioOverviewFetch } from "../../redux/portfolio";
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { StyleSheet } from "react-native";

const AnimatedFlatList = Reanimated.createAnimatedComponent(FlatList);

function PortfolioScreen({ navigation, fetchOverview, activePortfolio }) {
  const { colors } = useTheme();
  const goToSelectTransactionCoin = () =>
    navigation.navigate("AddTransaction", {
      selectedCoin: {
        id: "bitcoin",
        symbol: "BTC",
        name: "Bitcoin",
        image: "https://assets.coincap.io/assets/icons/btc@2x.png"
      }
    });

  const { scrollHandler, Fab: AddTransactionFab } = useHiddenFABOnScroll({
    icon: "plus",
    onFABClick: goToSelectTransactionCoin,
    accessibilityLabel: "Add Transaction"
  });

  useEffect(() => {
    if (activePortfolio !== null && activePortfolio?.id !== undefined) {
      fetchOverview(activePortfolio?.id);
    }
  }, [activePortfolio]);

  return activePortfolio === null ? (
    <View style={STYLES.noActivePortfolioContainer}>
      <Text style={[TYPOGRAPHY.headline, { textAlign: "center" }]}>Please select a portfolio from the menu</Text>
    </View>
  ) : (
    <>
      {/* <AnimatedFlatList
        contentContainerStyle={GLOBAL_STYLES.screenContainer}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        ListHeaderComponent={
          <>
            <Statistics />
            <Allocations />
            <HoldingsOverview />
          </>
        }
        listKey="PortfolioScreenList"
      /> */}
      <AddTransactionFab />
    </>
  );
}

const STYLES = StyleSheet.create({
  noActivePortfolioContainer: {
    ...GLOBAL_STYLES.screenContainer,
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
});

const mapStateToProps = createStructuredSelector({
  activePortfolio: selectActivePortfolio
});

const mapDispatchToProps = (dispatch) => ({
  fetchOverview: (id) => dispatch(startPortfolioOverviewFetch(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioScreen);
