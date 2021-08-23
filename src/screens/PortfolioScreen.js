import React from "react";
import { StyleSheet, FlatList } from "react-native";
import { connect } from "react-redux";
import { selectCurrentUser } from "../redux/user/user.selectors";
import { createStructuredSelector } from "reselect";
import { FAB, useTheme } from "react-native-paper";
import CurrentValue from "../components/portfolio/current-value/CurrentValue";
import AssetsBreakdown from "../components/portfolio/AssetsBreakdown";
import Reanimated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  withTiming
} from "react-native-reanimated";
import AllTimeProfit from "../components/portfolio/AllTimeProfit";
import Unauthenticated from "../components/portfolio/Unauthenticated";
import GlobalStyles from "../GlobalStyles";
import SummaryTabs from "../components/portfolio/SummaryTabs";
import CardScrollView from "../components/shared/CardScrollView";

const AnimatedFlatList = Reanimated.createAnimatedComponent(FlatList);

function PortfolioScreen({ navigation, isAuthenticated }) {
  const { colors } = useTheme();
  const isScrolling = useSharedValue(false);
  const fabStyles = useAnimatedStyle(() => ({
    transform: [{ scale: withTiming(isScrolling.value ? 0 : 1) }]
  }));
  const scrollHandler = useAnimatedScrollHandler({
    onEndDrag: () => (isScrolling.value = false),
    onMomentumEnd: () => (isScrolling.value = false),
    onBeginDrag: () => (isScrolling.value = true)
  });

  const navigateToAddTransactionScreen = () =>
    navigation.navigate("AddTransaction");

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
      <Reanimated.View style={[styles.bottomRight, fabStyles]}>
        <FAB
          style={[
            styles.addTransactionFab,
            { backgroundColor: colors.primary }
          ]}
          icon="plus"
          accessibilityLabel="Add Transaction"
          color="white"
          onPress={navigateToAddTransactionScreen}
        />
      </Reanimated.View>
    </>
  );
}

const styles = StyleSheet.create({
  bottomRight: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0
  },
  addTransactionFab: {
    width: 64,
    height: 64,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 32
  }
});

const mapStateToProps = createStructuredSelector({
  isAuthenticated: selectCurrentUser
});

export default connect(mapStateToProps)(PortfolioScreen);
