import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { GLOBAL_STYLES, TYPOGRAPHY } from "../../../styles";
import LottieView from "lottie-react-native";
import { Button } from "../../../shared-components";
import { GLOBAL_CONSTANTS } from "../../../constants";

const Unauthenticated = ({ navigation }) => {
  const { colors } = useTheme();

  return (
    <View style={STYLES.container}>
      <View style={STYLES.animationContainer}>
        <LottieView style={STYLES.animation} source={require("../../../assets/lottie/portfolio.json")} loop autoPlay />
      </View>
      <Text style={STYLES.heading}>Track Your Crypto Investments</Text>
      <Text style={STYLES.subheading}>
        Sign up or log in to track your crypto transactions, current balance and profit/loss.
      </Text>
      <Button
        onPress={() => navigation.navigate("SignUp")}
        style={STYLES.signUpBtn}
        mode="contained"
        label="Create an account"
      />
      <Button
        onPress={() =>
          navigation.navigate("AssetDetail", {
            image: "https://assets.coincap.io/assets/icons/btc@2x.png",
            name: "BTC"
          })
        }
        mode="contained"
        color={colors.card}
        labelStyle={{
          color: colors.text
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
