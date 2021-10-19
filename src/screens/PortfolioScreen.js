import React from "react";
import { FlatList } from "react-native";
import { connect } from "react-redux";
import { selectCurrentUser } from "../redux/user/user.selectors";
import { createStructuredSelector } from "reselect";
import CurrentValue from "../components/portfolio/current-value/CurrentValue";
import AssetsBreakdown from "../components/portfolio/AssetsBreakdown";
import Reanimated from "react-native-reanimated";
import AllTimeProfit from "../components/portfolio/AllTimeProfit";
import Unauthenticated from "../components/portfolio/Unauthenticated";
import GlobalStyles from "../GlobalStyles";
import SummaryTabs from "../components/portfolio/SummaryTabs";
import CardScrollView from "../components/shared/CardScrollView";
import useHiddenFABOnScroll from "../hooks/useHiddenFABOnScroll";

const AnimatedFlatList = Reanimated.createAnimatedComponent(FlatList);

function PortfolioScreen({ navigation, isAuthenticated }) {
  const navigateToAddTransactionScreen = () =>
    navigation.navigate("AddTransaction");

  const { scrollHandler, FAB } = useHiddenFABOnScroll({
    icon: "plus",
    onFABClick: navigateToAddTransactionScreen,
    accessibilityLabel: "Add Transaction"
  });

  if (!isAuthenticated) {
    return <Unauthenticated navigation={navigation} />;
  }

  return (
    <>
      <AnimatedFlatList
        contentContainerStyle={GlobalStyles.screenContainer}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        ListHeaderComponent={
          <>
            <CardScrollView containerStyle={GlobalStyles.componentContainer}>
              <CurrentValue />
              <AllTimeProfit />
            </CardScrollView>
            <SummaryTabs />
            <AssetsBreakdown />
          </>
        }
        listKey="PortfolioScreenList"
      />
      {FAB}
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  isAuthenticated: selectCurrentUser
});

export default connect(mapStateToProps)(PortfolioScreen);
