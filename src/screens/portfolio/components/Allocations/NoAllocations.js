import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { TYPOGRAPHY } from "../../../../styles";
import { AntDesign } from "@expo/vector-icons";
import { GLOBAL_CONSTANTS } from "../../../../constants";

const NoAllocations = () => {
  const { colors } = useTheme();

  return (
    <View style={STYLES.container}>
      <AntDesign name="piechart" size={100} color={colors?.primary} style={STYLES.pieChartIcon} />
      <Text style={[TYPOGRAPHY.title, TYPOGRAPHY.textAlignCenter]}>
        Add coins to your portfolio to see a percentage breakdown of your top 5 holdings
      </Text>
    </View>
  );
};

const STYLES = StyleSheet.create({
  container: { alignItems: "center", justifyContent: "center" },
  pieChartIcon: {
    marginBottom: GLOBAL_CONSTANTS.MD_MARGIN
  }
});

export default NoAllocations;
