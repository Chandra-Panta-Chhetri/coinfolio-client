import React from "react";
import { connect } from "react-redux";
import {
  selectCurrentPortfolioValue,
  selectIsLoadingPortfolioOverview,
  selectTotalInvested,
  selectTotalProfitLoss
} from "../../../../redux/portfolio";
import { CardScrollView } from "../../../../components";
import { formatPrice } from "../../../../utils";
import Statistic from "./Statistic";
import { StyleSheet } from "react-native";
import { GLOBAL_CONSTANTS } from "../../../../constants";

const Statistics = ({ currentValue, isLoading, totalProfitLoss, totalInvested }) => {
  return (
    <CardScrollView
      containerStyle={STYLES.cardContainer}
      children={
        isLoading
          ? [
              <Statistic.Skeleton key="Current Value Skeleton" />,
              <Statistic.Skeleton key="Total Invested Skeleton" />,
              <Statistic.Skeleton key="Total Profit/Loss Skeleton" />
            ]
          : [
              <Statistic title="Current Value" key="Current Value" value={formatPrice(currentValue)} />,
              <Statistic title="Total Invested" key="Total Invested" value={formatPrice(totalInvested)} />,
              <Statistic
                title="Total Profit/Loss"
                key="Total Profit/Loss"
                value={formatPrice(totalProfitLoss?.value)}
                percentChange={totalProfitLoss?.percentChange}
              />
            ]
      }
    />
  );
};

const STYLES = StyleSheet.create({
  cardContainer: {
    marginBottom: GLOBAL_CONSTANTS.LG_MARGIN
  }
});

const mapStateToProps = (state) => ({
  currentValue: selectCurrentPortfolioValue(state),
  totalProfitLoss: selectTotalProfitLoss(state),
  isLoading: selectIsLoadingPortfolioOverview(state),
  totalInvested: selectTotalInvested(state)
});

export default connect(mapStateToProps)(Statistics);
