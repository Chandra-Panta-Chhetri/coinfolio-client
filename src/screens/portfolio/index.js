import React, { useEffect } from "react";
import { FlatList } from "react-native";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Reanimated from "react-native-reanimated";
import { GLOBAL_STYLES } from "../../styles";
import { useFAB } from "../../hooks";
import { HoldingsOverview, Allocations, Statistics, NoActivePortfolio } from "./components";
import { selectActivePortfolio, fetchPortfolioOverview } from "../../redux/portfolio";
import SCREEN_NAMES from "../../navigators/screen-names";
import { isNullOrUndefined } from "../../utils";

const AnimatedFlatList = Reanimated.createAnimatedComponent(FlatList);

function PortfolioScreen({ navigation, fetchOverview, activePortfolio }) {
  const goToSelectTransactionCoin = () => navigation?.navigate(SCREEN_NAMES.SELECT_TRANSACTION_COIN);

  const { scrollHandler, Fab: AddTransactionFab } = useFAB({
    icon: "plus",
    onFABClick: goToSelectTransactionCoin,
    accessibilityLabel: "Add Transaction"
  });

  useEffect(() => {
    if (!isNullOrUndefined(activePortfolio) && !isNullOrUndefined(activePortfolio?.id)) {
      fetchOverview(activePortfolio?.id);
    }
  }, [activePortfolio]);

  return isNullOrUndefined(activePortfolio) ? (
    <NoActivePortfolio />
  ) : (
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
      />
      <AddTransactionFab />
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  activePortfolio: selectActivePortfolio
});

const mapDispatchToProps = (dispatch) => ({
  fetchOverview: (id) => dispatch(fetchPortfolioOverview(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioScreen);
