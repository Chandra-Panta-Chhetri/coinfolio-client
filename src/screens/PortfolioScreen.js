import React from "react";
import { StyleSheet, View, Image, FlatList } from "react-native";
import { connect } from "react-redux";
import { selectCurrentUser } from "../redux/user/user.selectors";
import { createStructuredSelector } from "reselect";
import { Button, Headline, Subheading, Card } from "react-native-paper";
import PortfolioValue from "../components/PortfolioValueCard";
import SummaryTabs from "../components/Tabs";

const UnAuthenticatedPortfolio = ({ navigation }) => (
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
    return <UnAuthenticatedPortfolio navigation={navigation} />;
  }
  return (
    <FlatList
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <>
          <PortfolioValue />
          <SummaryTabs>
            <Card tabLabel="Line Chart">
              <Card.Content>
                <Button mode="contained" uppercase={false}>
                  Test 1
                </Button>
              </Card.Content>
            </Card>
            <Card tabLabel="Pie Chart">
              <Card.Content>
                <Subheading>Hi 2</Subheading>
                <Button mode="contained" uppercase={false}>
                  Test 2
                </Button>
              </Card.Content>
            </Card>
            <Card tabLabel="Test Chart">
              <Card.Content>
                <Subheading>Hi 3</Subheading>
                <Button mode="contained" uppercase={false}>
                  Test 3
                </Button>
              </Card.Content>
            </Card>
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
