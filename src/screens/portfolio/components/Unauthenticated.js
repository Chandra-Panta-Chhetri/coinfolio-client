import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import { GLOBAL_STYLES, TYPOGRAPHY } from "../../../styles";
import LottieView from "lottie-react-native";

const Unauthenticated = ({ navigation }) => {
  const { colors } = useTheme();

  return (
    <View style={STYLES.container}>
      <View style={STYLES.animationContainer}>
        <LottieView style={STYLES.animation} source={require("../../../assets/lottie/portfolio.json")} loop autoPlay />
      </View>
      <Text style={STYLES.heading}>Track Your Crypto Investments</Text>
      <Text style={STYLES.subheading}>
        Signup or login to track your crypto transactions, current balance and profit/loss.
      </Text>
      <Button
        onPress={() => navigation.navigate("SignUp")}
        style={STYLES.signUpBtn}
        mode="contained"
        labelStyle={TYPOGRAPHY.button}
      >
        Create an account
      </Button>
      <Button
        onPress={() => navigation.navigate("Login")}
        mode="contained"
        color={colors.card}
        labelStyle={[
          TYPOGRAPHY.button,
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

const STYLES = StyleSheet.create({
  container: {
    ...GLOBAL_STYLES.screenContainer,
    justifyContent: "center",
    flex: 1
  },
  signUpBtn: {
    marginVertical: 10
  },
  animationContainer: { ...GLOBAL_STYLES.mdMarginBottom, alignItems: "center" },
  animation: {
    width: "100%",
    height: 270
  },
  heading: {
    ...TYPOGRAPHY.display1,
    ...TYPOGRAPHY.textAlignCenter
  },
  subheading: {
    ...TYPOGRAPHY.subheading,
    ...TYPOGRAPHY.textAlignCenter
  }
});

export default Unauthenticated;
