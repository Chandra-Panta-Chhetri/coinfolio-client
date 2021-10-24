import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import { GLOBAL_STYLES, TYPOGRAPHY } from "../../../styles";

const Unauthenticated = ({ navigation }) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/images/static-pie-chart.png")}
        style={styles.staticImage}
      />
      <Text style={styles.heading}>Track Your Crypto Investments</Text>
      <Text style={styles.subheading}>
        Signup or login to track your crypto transactions, current balance and
        profit/loss.
      </Text>
      <Button
        onPress={() => navigation.navigate("SignUp")}
        style={styles.signUpBtn}
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

const styles = StyleSheet.create({
  container: {
    ...GLOBAL_STYLES.screenContainer,
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
