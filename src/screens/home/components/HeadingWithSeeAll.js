import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { TYPOGRAPHY } from "../../../styles";
import { Button } from "../../../shared-components";
import { GLOBAL_CONSTANTS } from "../../../constants";

const HeadingWithSeeAll = ({ title = "", seeAllBtnLabel = "See All", subheading, onSeeAllPress }) => (
  <View style={STYLES.container}>
    <View style={STYLES.headingAndSellAll}>
      <Text style={TYPOGRAPHY.headline}>{title}</Text>
      <Button compact onPress={onSeeAllPress} label={seeAllBtnLabel} />
    </View>
    {subheading && <Text style={TYPOGRAPHY.body1}>{subheading}</Text>}
  </View>
);

const STYLES = StyleSheet.create({
  container: {
    marginBottom: GLOBAL_CONSTANTS.MD_MARGIN
  },
  headingAndSellAll: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }
});

export default HeadingWithSeeAll;
