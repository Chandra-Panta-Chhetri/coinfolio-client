import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
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
      <Text style={GlobalStyles.subheading}>Current Value</Text>
      <View style={styles.valueAndPercent}>
        <Text style={GlobalStyles.title}>${currentValue.value}</Text>
        <Text
          style={[
            GlobalStyles.subheading,
            getStylesBasedOnPosOrNeg(currentValue.percent)
          ]}
        >
          {appendPlusOrMinus(currentValue.percent)}%
        </Text>
      </View>
      <Text
        style={[
          GlobalStyles.caption,
          getStylesBasedOnPosOrNeg(currentValue.plChange)
        ]}
      >
        {appendPlusOrMinus(currentValue.plChange, " $")} (24h)
      </Text>
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
