import React from "react";
import LottieView from "lottie-react-native";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { TYPOGRAPHY } from "../styles";

const NO_RESULTS_ANIMATION_PATH = "../assets/lottie/no-results.json";

const NoResults = ({ width = "50%", height = "100%", containerStyles }) => {
  return (
    <View style={[containerStyles, STYLES.animationContainer]}>
      <LottieView
        style={[
          {
            width,
            height
          },
          STYLES.animation
        ]}
        source={require(NO_RESULTS_ANIMATION_PATH)}
        loop
        autoPlay
      />
      <Text style={STYLES.title}>No results</Text>
    </View>
  );
};

const STYLES = StyleSheet.create({
  animationContainer: { alignItems: "center", overflow: "hidden", flex: 1 },
  title: { marginTop: -20, flex: 1, ...TYPOGRAPHY.title },
  animation: {
    flex: 1,
    transform: [{ scale: 1.2 }]
  }
});

export default NoResults;
