import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Headline, Subheading } from "react-native-paper";
import CONSTANTS from "../../Constants";
import GlobalStyles from "../../GlobalStyles";

const HeadingWithSeeAll = ({
  headingTitle = "",
  seeAllBtnLabel = "See All",
  subheading,
  onSeeAllBtnPress = CONSTANTS.SHARED.EMPTY_FUNCTION
}) => {
  return (
    <>
      <View style={styles.container}>
        <Headline style={[GlobalStyles.headline]}>{headingTitle}</Headline>
        <Button
          compact
          onPress={onSeeAllBtnPress}
          labelStyle={[GlobalStyles.button]}
        >
          {seeAllBtnLabel}
        </Button>
      </View>
      {subheading && (
        <Subheading style={[GlobalStyles.body1]}>{subheading}</Subheading>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }
});

export default HeadingWithSeeAll;
