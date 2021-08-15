import React from "react";
import { StyleSheet, FlatList } from "react-native";
import { connect } from "react-redux";
import { selectCurrentUser } from "../redux/user/user.selectors";
import { createStructuredSelector } from "reselect";
import { FAB, useTheme } from "react-native-paper";
import CurrentValue from "../components/PortfolioCurrentValue";
import SummaryTabs from "../components/Tabs";
import PortfolioLineChart from "../components/PortfolioLineChart";
import PortfolioPieChart from "../components/PortfolioPieChart";
import AssetsBreakdown from "../components/PortfolioAssets";
import { Entypo } from "@expo/vector-icons";
import Reanimated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  withTiming
} from "react-native-reanimated";
import OverallProfit from "../components/PortfolioOverallProfit";
import Unauthenticated from "../components/portfolio/Unauthenticated";

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
            <OverallProfit />
            <SummaryTabs>
              <PortfolioLineChart
                tabLabel="Historic Value"
                iconComponent={<Entypo name="line-graph" size={24} />}
              />
              <PortfolioPieChart
                tabLabel="Allocations"
                iconComponent={<Entypo name="pie-chart" size={24} />}
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
    padding: 10
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
