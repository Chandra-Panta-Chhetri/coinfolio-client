import React from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { selectCurrentUser } from "../redux/user/user.selectors";
import { createStructuredSelector } from "reselect";
import { Button, Text } from "react-native-paper";

function PortfolioScreen({ navigation, isAuthenticated }) {
  if (!isAuthenticated) {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.text}>Portfolio Screen</Text>
        </View>
        <Button onPress={() => navigation.navigate("SignUp")}>
          Create an account
        </Button>
        <Button onPress={() => navigation.navigate("Login")}>Login</Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    color: "#101010",
    fontSize: 24,
    fontWeight: "bold"
  }
});

const mapStateToProps = createStructuredSelector({
  isAuthenticated: selectCurrentUser
});

export default connect(mapStateToProps)(PortfolioScreen);
