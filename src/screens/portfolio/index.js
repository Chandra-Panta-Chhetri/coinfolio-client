import React, { useEffect } from "react";
import { FlatList } from "react-native";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Reanimated from "react-native-reanimated";
import { GLOBAL_STYLES } from "../../styles";
import { useHiddenFABOnScroll } from "../../hooks";
import { HoldingsOverview, Allocations, Unauthenticated, Statistics } from "./components";
import { selectActivePortfolio, startPortfolioOverviewFetch } from "../../redux/portfolio";

const AnimatedFlatList = Reanimated.createAnimatedComponent(FlatList);

function PortfolioScreen({ navigation, fetchOverview, activePortfolio }) {
  const navigateToAddTransactionScreen = () => navigation.navigate("AddTransaction");

  const { scrollHandler, Fab: AddTransactionFab } = useHiddenFABOnScroll({
    icon: "plus",
    onFABClick: navigateToAddTransactionScreen,
    accessibilityLabel: "Add Transaction"
  });

  useEffect(() => {
    if (activePortfolio !== null && activePortfolio?.id !== null) {
      fetchOverview(activePortfolio?.id);
    }
  }, [activePortfolio]);

  return (
    <>
      <AnimatedFlatList
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
      />
      <AddTransactionFab />
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  activePortfolio: selectActivePortfolio
});

const mapDispatchToProps = (dispatch) => ({
  fetchOverview: (id) => dispatch(startPortfolioOverviewFetch(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioScreen);
