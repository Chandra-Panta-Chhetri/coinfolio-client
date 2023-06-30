import React from "react";
import { StyleSheet, View, Text } from "react-native";

function ChangePasswordScreen() {
  return (
    <View style={STYLES.container}>
      <Text style={STYLES.text}>Change Password Screen</Text>
    </View>
  );
}

const STYLES = StyleSheet.create({
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

export default ChangePasswordScreen;
