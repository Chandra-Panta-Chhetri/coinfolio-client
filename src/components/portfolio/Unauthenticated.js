import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { Button, Headline, Subheading, useTheme } from "react-native-paper";

const Unauthenticated = ({ navigation }) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/images/static-pie-chart.png")}
        style={styles.staticImage}
      />
      <Headline style={styles.heading}>Track Your Crypto Investments</Headline>
      <Subheading style={styles.subheading}>
        Signup or login to track your crypto transactions, current balance and
        profit/loss.
      </Subheading>
      <Button
        uppercase={false}
        onPress={() => navigation.navigate("SignUp")}
        style={styles.signUpBtn}
        mode="contained"
        labelStyle={styles.bold}
      >
        Create an account
      </Button>
      <Button
        onPress={() => navigation.navigate("Login")}
        mode="contained"
        uppercase={false}
        style={{
          backgroundColor: colors.portfolio.loginBtnBackground
        }}
        labelStyle={{
          color: colors.portfolio.loginBtnText,
          fontWeight: "bold"
        }}
      >
        Login
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    justifyContent: "center",
    flex: 1
  },
  heading: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 22,
    letterSpacing: 2
  },
  subheading: {
    textAlign: "center",
    letterSpacing: 1
  },
  signUpBtn: {
    marginVertical: 10
  },
  staticImage: {
    width: "100%",
    height: 150,
    backgroundColor: "transparent",
    resizeMode: "contain",
    marginBottom: 10
  },
  bold: {
    fontWeight: "bold"
  }
});

export default Unauthenticated;
