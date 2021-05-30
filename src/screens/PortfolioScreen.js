import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { connect } from "react-redux";
import { selectCurrentUser } from "../redux/user/user.selectors";
import { createStructuredSelector } from "reselect";
import { Button, Text, Headline, Subheading } from "react-native-paper";

const UnAuthenticatedPortfolio = ({ navigation }) => (
  <View style={styles.container}>
    <Image
      source={{
        uri: "https://www.pngkit.com/png/detail/243-2438344_3d-chart-4-icon-png-3-pie-chart.png"
      }}
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
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
    height: 200,
    backgroundColor: "transparent"
  }
});

const mapStateToProps = createStructuredSelector({
  isAuthenticated: selectCurrentUser
});

export default connect(mapStateToProps)(PortfolioScreen);
