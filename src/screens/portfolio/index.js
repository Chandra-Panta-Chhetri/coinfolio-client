import React from "react";
import { FlatList } from "react-native";
import { connect } from "react-redux";
import { selectCurrentUser } from "../../redux/user";
import { createStructuredSelector } from "reselect";
import Reanimated from "react-native-reanimated";
import { GLOBAL_STYLES } from "../../styles";
import { CardScrollView } from "../../shared-components";
import { useHiddenFABOnScroll } from "../../hooks";
import { CurrentValue, AssetsBreakdown, AllTimeProfit, SummaryTabs, Unauthenticated } from "./components";

const AnimatedFlatList = Reanimated.createAnimatedComponent(FlatList);

function PortfolioScreen({ navigation, isAuthenticated }) {
  const navigateToAddTransactionScreen = () => navigation.navigate("AddTransaction");

  const { scrollHandler, Fab } = useHiddenFABOnScroll({
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
        contentContainerStyle={GLOBAL_STYLES.screenContainer}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        ListHeaderComponent={
          <>
            <CardScrollView containerStyle={GLOBAL_STYLES.lgMarginBottom}>
              <CurrentValue />
              <AllTimeProfit />
            </CardScrollView>
            <SummaryTabs />
            <AssetsBreakdown />
          </>
        }
        listKey="PortfolioScreenList"
      />
      <Fab />
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  isAuthenticated: selectCurrentUser
});

export default connect(mapStateToProps)(PortfolioScreen);
