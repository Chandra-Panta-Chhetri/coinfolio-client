import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, Card } from "react-native-paper";
import { GLOBAL_STYLES, TYPOGRAPHY } from "../../../styles";
import { Button } from "../../../shared-components";
import { GLOBAL_CONSTANTS } from "../../../constants";

const LogInOrCreateAccount = ({ navigation }) => (
  <Card style={STYLES.cardContainer}>
    <Card.Content>
      <Text style={TYPOGRAPHY.title}>Get More Features!</Text>
      <Text style={TYPOGRAPHY.body1}>
        Login or create an account to get access to features such as custom price alerts, watchlist, portfolio tracker &
        more!
      </Text>
      <View style={STYLES.container}>
        <Button
          onPress={() => navigation.navigate("Login")}
          mode="contained"
          style={STYLES.logInButton}
          label="Login"
        />
        <Button label="Create an account" onPress={() => navigation.navigate("SignUp")} mode="contained" />
      </View>
    </Card.Content>
  </Card>
);

const STYLES = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10
  },
  cardContainer: {
    marginBottom: GLOBAL_CONSTANTS.LG_MARGIN
  },
  logInButton: { marginRight: GLOBAL_CONSTANTS.MD_MARGIN, flex: 1 }
});

export default LogInOrCreateAccount;
