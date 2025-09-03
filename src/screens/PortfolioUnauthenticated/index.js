import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { GLOBAL_STYLES, TYPOGRAPHY } from "../../styles";
import LottieView from "lottie-react-native";
import { Button } from "../../components";
import { GLOBAL_CONSTANTS } from "../../constants";
import SCREEN_NAMES from "../../navigators/screen-names";

const LOTTIE_PORTFOLIO_PATH = "../../assets/lottie/portfolio.json";

const PortfolioUnauthenticatedScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const goToSignUp = () => navigation?.navigate(SCREEN_NAMES.SIGN_UP);
  const goToLogin = () => navigation?.navigate(SCREEN_NAMES.LOGIN);

  return (
    <View style={STYLES.container}>
      <View style={STYLES.animationContainer}>
        <LottieView style={STYLES.animation} source={require(LOTTIE_PORTFOLIO_PATH)} loop autoPlay />
      </View>
      <Text style={STYLES.heading}>Track Your Crypto Investments</Text>
      <Text style={STYLES.subheading}>
        Sign up or log in to track your crypto transactions, current balance and profit/loss.
      </Text>
      <Button onPress={goToSignUp} style={STYLES.signUpBtn} mode="contained" label="Create an account" />
      <Button
        onPress={goToLogin}
        mode="contained"
        buttonColor={colors?.card}
        labelStyle={{
          color: colors?.text
        }}
        label="Login"
      />
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
  animationContainer: { marginBottom: GLOBAL_CONSTANTS.MD_MARGIN, alignItems: "center" },
  animation: {
    width: "100%"
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

export default PortfolioUnauthenticatedScreen;
