import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, Button, Card } from "react-native-paper";
import { GLOBAL_STYLES, TYPOGRAPHY } from "../../../styles";

const LogInOrCreateAccount = ({ navigation }) => (
  <Card style={GLOBAL_STYLES.componentContainer}>
    <Card.Content>
      <Text style={TYPOGRAPHY.title}>Get More Features!</Text>
      <Text style={TYPOGRAPHY.body1}>
        Login or create an account to get access to features such as custom
        price alerts, watchlist, portfolio tracker & more!
      </Text>
      <View style={styles.container}>
        <Button
          labelStyle={TYPOGRAPHY.button}
          onPress={() => navigation.navigate("Login")}
          mode="contained"
          style={styles.logInButton}
        >
          Login
        </Button>
        <Button
          labelStyle={TYPOGRAPHY.button}
          onPress={() => navigation.navigate("SignUp")}
          mode="contained"
        >
          Create an account
        </Button>
      </View>
    </Card.Content>
  </Card>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10
  },
  logInButton: { marginRight: 10, flex: 1 }
});

export default LogInOrCreateAccount;
