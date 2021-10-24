import React from "react";
import { StyleSheet, View, Text } from "react-native";

function SelectCurrencyScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Select Currency Screen</Text>
    </View>
  );
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

export default SelectCurrencyScreen;
