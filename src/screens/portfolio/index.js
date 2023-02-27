import React, { useEffect } from "react";
import { FlatList } from "react-native";
import { connect } from "react-redux";
import { selectCurrentUser } from "../../redux/user";
import { createStructuredSelector } from "reselect";
import Reanimated from "react-native-reanimated";
import { GLOBAL_STYLES } from "../../styles";
import { useHiddenFABOnScroll } from "../../hooks";
import { HoldingsOverview, Allocations, Unauthenticated, Statistics } from "./components";
import { startPortfolioFetch } from "../../redux/portfolio";

const AnimatedFlatList = Reanimated.createAnimatedComponent(FlatList);

function PortfolioScreen({ navigation, isAuthenticated, fetchOverview }) {
  const navigateToAddTransactionScreen = () => navigation.navigate("AddTransaction");

  const { scrollHandler, Fab: AddTransactionFab } = useHiddenFABOnScroll({
    icon: "plus",
    onFABClick: navigateToAddTransactionScreen,
    accessibilityLabel: "Add Transaction"
  });

  useEffect(() => {
    fetchOverview(1);
  }, []);

  if (isAuthenticated) {
    return <Unauthenticated navigation={navigation} />;
  }

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
  isAuthenticated: selectCurrentUser
});

const mapDispatchToProps = (dispatch) => ({
  fetchOverview: (id) => dispatch(startPortfolioFetch(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioScreen);
