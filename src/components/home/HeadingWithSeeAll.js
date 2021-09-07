import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import CONSTANTS from "../../Constants";
import GlobalStyles from "../../GlobalStyles";

const HeadingWithSeeAll = ({
  headingTitle = "",
  seeAllBtnLabel = "See All",
  subheading,
  onSeeAllBtnPress = CONSTANTS.SHARED.EMPTY_FUNCTION
}) => (
  <View style={styles.container}>
    <View style={styles.headingAndSellAll}>
      <Text style={[GlobalStyles.headline]}>{headingTitle}</Text>
      <Button
        compact
        onPress={onSeeAllBtnPress}
        labelStyle={[GlobalStyles.button]}
      >
        {seeAllBtnLabel}
      </Button>
    </View>
    {subheading && <Text style={[GlobalStyles.body1]}>{subheading}</Text>}
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
