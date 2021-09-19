import React from "react";
import { StyleSheet, View, Text } from "react-native";

function SelectEventFiltersScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Select Event Filters</Text>
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

export default SelectEventFiltersScreen;
