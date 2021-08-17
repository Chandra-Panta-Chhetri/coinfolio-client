import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Headline } from "react-native-paper";
import CONSTANTS from "../../Constants";

const HeadingWithSeeAll = ({
  headingTitle = "",
  seeAllBtnLabel = "See All",
  onSeeAllBtnPress = CONSTANTS.SHARED.EMPTY_FUNCTION
}) => {
  return (
    <View style={styles.container}>
      <Headline style={styles.bold}>{headingTitle}</Headline>
      <Button
        compact
        uppercase={false}
        labelStyle={styles.seeAllButton}
        onPress={onSeeAllBtnPress}
      >
        {seeAllBtnLabel}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  bold: {
    fontWeight: "bold"
  },
  seeAllButton: {
    fontWeight: "bold"
  }
});

export default HeadingWithSeeAll;
