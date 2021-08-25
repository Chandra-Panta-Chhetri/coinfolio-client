import React from "react";
import { StyleSheet, View } from "react-native";
import { Paragraph, Subheading } from "react-native-paper";
import { connect } from "react-redux";
import GlobalStyles from "../../../GlobalStyles";
import {
  selectIsLoadingPortfolio,
  selectCurrentPortfolioValue
} from "../../../redux/portfolio/portfolio.selectors";
import CurrentValueSkeleton from "./Skeleton";
import {
  appendPlusOrMinus,
  getStylesBasedOnPosOrNeg
} from "../../../GlobalUtils";

const CurrentValue = ({ currentValue, isLoading, width = "100%" }) => {
  if (isLoading && currentValue === null) {
    return <CurrentValueSkeleton />;
  }

  return (
    <View style={{ width }}>
      <Paragraph style={GlobalStyles.subheading}>Current Value</Paragraph>
      <View style={styles.valueAndPercent}>
        <Subheading style={GlobalStyles.title}>
          ${currentValue.value}
        </Subheading>
        <Subheading
          style={[
            GlobalStyles.subheading,
            getStylesBasedOnPosOrNeg(currentValue.percent)
          ]}
        >
          {appendPlusOrMinus(currentValue.percent)}%
        </Subheading>
      </View>
      <Paragraph
        style={[
          GlobalStyles.caption,
          getStylesBasedOnPosOrNeg(currentValue.plChange)
        ]}
      >
        {appendPlusOrMinus(currentValue.plChange, " $")} (24h)
      </Paragraph>
    </View>
  );
};

const styles = StyleSheet.create({
  valueAndPercent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }
});

const mapStateToProps = (state) => ({
  currentValue: selectCurrentPortfolioValue(state),
  isLoading: selectIsLoadingPortfolio(state)
});

export default connect(mapStateToProps)(CurrentValue);
