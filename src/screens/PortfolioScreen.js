import React from "react";
import { StyleSheet, FlatList } from "react-native";
import { connect } from "react-redux";
import { selectCurrentUser } from "../redux/user/user.selectors";
import { createStructuredSelector } from "reselect";
import { FAB } from "react-native-paper";
import CurrentValue from "../components/portfolio/current-value/CurrentValue";
import SummaryTabs from "../components/shared/Tabs";
import HistoricValue from "../components/portfolio/HistoricValue";
import Allocations from "../components/portfolio/Allocations";
import AssetsBreakdown from "../components/portfolio/AssetsBreakdown";
import { Entypo } from "@expo/vector-icons";
import Reanimated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  withTiming
} from "react-native-reanimated";
import AllTimeProfit from "../components/portfolio/AllTimeProfit";
import Unauthenticated from "../components/portfolio/Unauthenticated";
import CONSTANTS from "../Constants";

const AnimatedFlatList = Reanimated.createAnimatedComponent(FlatList);

function PortfolioScreen({ navigation, isAuthenticated }) {
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
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        ListHeaderComponent={
          <>
            <CurrentValue />
            <AllTimeProfit />
            <SummaryTabs
              tabHeadingMarginBottom={CONSTANTS.PORTFOLIO.MARGIN_BOTTOM}
            >
              <HistoricValue
                tabLabel="Historic Value"
                iconComponent={
                  <Entypo
                    name="line-graph"
                    size={CONSTANTS.SHARED.TAB_HEADING_ICON_SIZE}
                  />
                }
              />
              <Allocations
                tabLabel="Allocations"
                iconComponent={
                  <Entypo
                    name="pie-chart"
                    size={CONSTANTS.SHARED.TAB_HEADING_ICON_SIZE}
                  />
                }
              />
            </SummaryTabs>
            <AssetsBreakdown />
          </>
        }
        listKey="PortfolioScreenList"
      />
      <Reanimated.View style={[styles.bottomRight, fabStyles]}>
        <FAB
          style={[styles.addTransactionFab]}
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
  container: {
    padding: CONSTANTS.SHARED.SCREEN_PADDING
  },
  bottomRight: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0
  },
  addTransactionFab: {
    backgroundColor: "#007aff",
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
