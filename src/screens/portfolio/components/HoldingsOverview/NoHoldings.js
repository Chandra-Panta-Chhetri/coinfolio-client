import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { TYPOGRAPHY } from "../../../../styles";

const NoHoldings = () => {
  return (
    <View style={STYLES.container}>
      <Text style={[TYPOGRAPHY.title, TYPOGRAPHY.textAlignCenter]}>
        Add coins to your portfolio by adding transactions
      </Text>
    </View>
  );
};

const STYLES = StyleSheet.create({
  container: { alignItems: "center", justifyContent: "center", height: 120 }
});

export default NoHoldings;
