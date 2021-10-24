import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { connect } from "react-redux";
import { TYPOGRAPHY } from "../../../../styles";
import {
  selectIsLoadingPortfolio,
  selectCurrentPortfolioValue
} from "../../../../redux/portfolio";
import CurrentValueSkeleton from "./Skeleton";
import { formatNumBasedOnSign, getStylesBasedOnSign } from "../../../../utils";

const CurrentValue = ({ currentValue, isLoading, width = "100%" }) => {
  if (isLoading && currentValue === null) {
    return <CurrentValueSkeleton />;
  }

  return (
    <View style={{ width }}>
      <Text style={TYPOGRAPHY.subheading}>Current Value</Text>
      <View style={STYLES.valueAndPercent}>
        <Text style={TYPOGRAPHY.title}>${currentValue.value}</Text>
        <Text
          style={[
            TYPOGRAPHY.subheading,
            getStylesBasedOnSign(currentValue.percent)
          ]}
        >
          {formatNumBasedOnSign(currentValue.percent)}%
        </Text>
      </View>
      <Text
        style={[
          TYPOGRAPHY.caption,
          getStylesBasedOnSign(currentValue.plChange)
        ]}
      >
        {formatNumBasedOnSign(currentValue.plChange, " $")} (24h)
      </Text>
    </View>
  );
};

const STYLES = StyleSheet.create({
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
