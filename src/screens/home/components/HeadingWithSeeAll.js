import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { TYPOGRAPHY } from "../../../styles";

const HeadingWithSeeAll = ({ title = "", seeAllBtnLabel = "See All", subheading, onSeeAllPress }) => (
  <View style={STYLES.container}>
    <View style={STYLES.headingAndSellAll}>
      <Text style={TYPOGRAPHY.headline}>{title}</Text>
      <Button compact onPress={onSeeAllPress} labelStyle={TYPOGRAPHY.button}>
        {seeAllBtnLabel}
      </Button>
    </View>
    {subheading && <Text style={TYPOGRAPHY.body1}>{subheading}</Text>}
  </View>
);

const STYLES = StyleSheet.create({
  container: {
    marginBottom: 10
  },
  headingAndSellAll: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }
});

export default HeadingWithSeeAll;
