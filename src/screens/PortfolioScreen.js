import React from "react";
import { StyleSheet, View, Image, FlatList } from "react-native";
import { connect } from "react-redux";
import { selectCurrentUser } from "../redux/user/user.selectors";
import { createStructuredSelector } from "reselect";
import { Button, Headline, Subheading } from "react-native-paper";
import PortfolioValue from "../components/PortfolioValueCard";
import SummaryTabs from "../components/Tabs";
import PortfolioLineChart from "../components/PortfolioLineChart";
import PortfolioPieChart from "../components/PortfolioPieChart";
import { Entypo } from "@expo/vector-icons";

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

function PortfolioScreen({ navigation, isAuthenticated }) {
  if (!isAuthenticated) {
    return <UnauthenticatedPortfolio navigation={navigation} />;
  }

  return (
    <FlatList
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <>
          <PortfolioValue />
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
        </>
      }
      listKey="PortfolioScreenList"
    />
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
  }
});

const mapStateToProps = createStructuredSelector({
  isAuthenticated: selectCurrentUser
});

export default connect(mapStateToProps)(PortfolioScreen);
