import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Headline } from "react-native-paper";

const HeadingWithSeeAll = ({
  headingTitle = "",
  seeAllBtnLabel = "See All",
  onSeeAllBtnPress = () => {}
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
    fontWeight: "bold",
    color: "blue"
  }
});

export default HeadingWithSeeAll;
