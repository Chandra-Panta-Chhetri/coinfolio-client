import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { GLOBAL_CONSTANTS } from "../../../constants";
import { TYPOGRAPHY } from "../../../styles";

const HeadingWithSeeAll = ({
  headingTitle = "",
  seeAllBtnLabel = "See All",
  subheading,
  onSeeAllBtnPress = GLOBAL_CONSTANTS.EMPTY_FUNCTION
}) => (
  <View style={styles.container}>
    <View style={styles.headingAndSellAll}>
      <Text style={TYPOGRAPHY.headline}>{headingTitle}</Text>
      <Button compact onPress={onSeeAllBtnPress} labelStyle={TYPOGRAPHY.button}>
        {seeAllBtnLabel}
      </Button>
    </View>
    {subheading && <Text style={TYPOGRAPHY.body1}>{subheading}</Text>}
  </View>
);

const styles = StyleSheet.create({
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
