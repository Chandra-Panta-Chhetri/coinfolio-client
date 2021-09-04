import React, { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import GlobalStyles from "../GlobalStyles";

const LatestNewsScreen = () => {
  useEffect(() => {
    console.log("in latest news screen");
  }, []);

  return (
    <View style={[GlobalStyles.screenContainer, { paddingTop: 0 }]}>
      <Text style={styles.text}>Latest News Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1
  },
  text: {
    color: "#101010",
    fontSize: 24,
    fontWeight: "bold"
  }
});

export default LatestNewsScreen;
