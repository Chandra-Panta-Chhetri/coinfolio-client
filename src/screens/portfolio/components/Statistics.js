import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { connect } from "react-redux";
import { GLOBAL_CONSTANTS } from "../../../constants";
import {
  selectCurrentPortfolioValue,
  selectIsLoadingPortfolioOverview,
  selectTotalInvested,
  selectTotalProfitLoss
} from "../../../redux/portfolio";
import { CardScrollView, Skeleton } from "../../../shared-components";
import { TYPOGRAPHY } from "../../../styles";
import { formatNumWorklet, formatPercentWorklet, getStylesBasedOnSign } from "../../../utils";

const StatSkeleton = ({ width = "100%" }) => (
  <View style={{ width, marginBottom: GLOBAL_CONSTANTS.LG_MARGIN }}>
    <Skeleton style={STYLES.titleSkeleton} />
    <Skeleton style={STYLES.valueSkeleton} />
  </View>
);

const Stat = ({ title, value, percentChange, width = "100%" }) => (
  <View style={{ width }}>
    <Text style={TYPOGRAPHY.subheading}>{title}</Text>
    <View style={STYLES.statContainer}>
      <Text style={TYPOGRAPHY.title}>{value}</Text>
      {percentChange === undefined ? null : (
        <Text style={[TYPOGRAPHY.subheading, getStylesBasedOnSign(percentChange)]}>
          {formatPercentWorklet(percentChange)}
        </Text>
      )}
    </View>
  </View>
);

const Statistics = ({ currentValue, isLoading, totalProfitLoss, totalInvested }) => {
  return (
    <CardScrollView containerStyle={STYLES.cardContainer}>
      {isLoading ? <StatSkeleton /> : <Stat title="Current Value" value={`$${formatNumWorklet(currentValue)}`} />}
      {isLoading ? <StatSkeleton /> : <Stat title="Total Invested" value={`$${formatNumWorklet(totalInvested)}`} />}
      {isLoading ? (
        <StatSkeleton />
      ) : (
        <Stat
          title="Total Profit/Loss"
          value={`$${formatNumWorklet(totalProfitLoss?.value)}`}
          percentChange={totalProfitLoss?.percentChange}
        />
      )}
    </CardScrollView>
  );
};

const STYLES = StyleSheet.create({
  cardContainer: {
    marginBottom: GLOBAL_CONSTANTS.LG_MARGIN
  },
  statContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  valueSkeleton: {
    borderRadius: GLOBAL_CONSTANTS.BORDER_RADIUS,
    height: 25,
    width: "65%"
  },
  titleSkeleton: {
    marginBottom: GLOBAL_CONSTANTS.MD_MARGIN,
    borderRadius: GLOBAL_CONSTANTS.BORDER_RADIUS,
    height: 25,
    width: "50%"
  }
});

const mapStateToProps = (state) => ({
  currentValue: selectCurrentPortfolioValue(state),
  totalProfitLoss: selectTotalProfitLoss(state),
  isLoading: selectIsLoadingPortfolioOverview(state),
  totalInvested: selectTotalInvested(state)
});

export default connect(mapStateToProps)(Statistics);
