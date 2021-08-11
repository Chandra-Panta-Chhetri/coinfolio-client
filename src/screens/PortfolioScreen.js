import React from "react";
import { StyleSheet, View, Image, FlatList } from "react-native";
import { connect } from "react-redux";
import { selectCurrentUser } from "../redux/user/user.selectors";
import { createStructuredSelector } from "reselect";
import {
  Button,
  Headline,
  Subheading,
  Card,
  Paragraph,
  FAB
} from "react-native-paper";
import PortfolioValue from "../components/PortfolioValueCard";
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

const AnimatedFlatList = Reanimated.createAnimatedComponent(FlatList);

const UnauthenticatedPortfolio = ({ navigation }) => (
  <View style={styles.noAuthContainer}>
    <Image
      source={require("../../assets/images/portfolio-static-pie-chart.png")}
      style={styles.noAuthImage}
    />
    <Headline style={styles.noAuthHeading}>
      Track Your Crypto Portfolio
    </Headline>
    <Subheading style={styles.noAuthSubheading}>
      Signup or login to track your crypto transactions, current balance and
      profit/loss.
    </Subheading>
    <Button
      uppercase={false}
      onPress={() => navigation.navigate("SignUp")}
      style={styles.signUpBtn}
      mode="contained"
    >
      Create an account
    </Button>
    <Button
      onPress={() => navigation.navigate("Login")}
      mode="contained"
      uppercase={false}
    >
      Login
    </Button>
  </View>
);

const OverallProfit = () => (
  <Card style={styles.overallContainer}>
    <Card.Content>
      <Paragraph style={styles.overallLabel}>Total Profit/Loss</Paragraph>
      <View style={styles.overallProfitAndPercent}>
        <Subheading style={styles.overallText}>$8000.00</Subheading>
        <Subheading style={[styles.overallText, { color: "green" }]}>
          +14.00%
        </Subheading>
      </View>
    </Card.Content>
  </Card>
);

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
    return <UnauthenticatedPortfolio navigation={navigation} />;
  }

  return (
    <>
      <AnimatedFlatList
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        ListHeaderComponent={
          <>
            <PortfolioValue />
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
  noAuthContainer: {
    padding: 10,
    justifyContent: "center",
    flex: 1
  },
  container: {
    padding: 10
  },
  noAuthHeading: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 22,
    letterSpacing: 2
  },
  noAuthSubheading: {
    textAlign: "center",
    letterSpacing: 1
  },
  signUpBtn: {
    marginVertical: 10
  },
  noAuthImage: {
    width: "100%",
    height: 150,
    backgroundColor: "transparent",
    resizeMode: "contain",
    marginBottom: 10
  },
  overallContainer: {
    marginTop: 15
  },
  overallProfitAndPercent: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  overallText: {
    fontWeight: "bold",
    letterSpacing: 1,
    fontSize: 16
  },
  overallLabel: {
    fontWeight: "bold",
    letterSpacing: 1,
    fontSize: 15
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
