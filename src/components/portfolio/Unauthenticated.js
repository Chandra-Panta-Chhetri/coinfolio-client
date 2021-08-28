import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import GlobalStyles from "../../GlobalStyles";

const Unauthenticated = ({ navigation }) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, GlobalStyles.screenContainer]}>
      <Image
        source={require("../../../assets/images/static-pie-chart.png")}
        style={styles.staticImage}
      />
      <Text style={[GlobalStyles.display1, GlobalStyles.textAlignCenter]}>
        Track Your Crypto Investments
      </Text>
      <Text style={[GlobalStyles.subheading, GlobalStyles.textAlignCenter]}>
        Signup or login to track your crypto transactions, current balance and
        profit/loss.
      </Text>
      <Button
        onPress={() => navigation.navigate("SignUp")}
        style={styles.signUpBtn}
        mode="contained"
        labelStyle={GlobalStyles.button}
      >
        Create an account
      </Button>
      <Button
        onPress={() => navigation.navigate("Login")}
        mode="contained"
        color={colors.card}
        labelStyle={[
          GlobalStyles.button,
          {
            color: colors.text
          }
        ]}
      >
        Login
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1
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
  }
});

export default Unauthenticated;
