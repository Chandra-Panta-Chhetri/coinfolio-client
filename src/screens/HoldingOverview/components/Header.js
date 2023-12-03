import React from "react";
import { View, StyleSheet } from "react-native";
import { Card, Text } from "react-native-paper";
import { GLOBAL_CONSTANTS } from "../../../constants";
import { Skeleton } from "../../../components";
import { TYPOGRAPHY } from "../../../styles";
import { formatNum, formatPercent, formatPrice, getStylesBasedOnSignWorklet, isNullOrUndefined } from "../../../utils";
import { selectSelectedCurrency } from "../../../redux/currency";
import { connect } from "react-redux";

const StatisticsSkeleton = () => (
  <View>
    <Skeleton count={2} style={STYLES.statisticSkeleton} />
    <Skeleton style={STYLES.lastRowStatisticSkeleton} />
  </View>
);

const Statistics = ({ holdingOverview, selectedCurrency }) => (
  <View>
    <View style={STYLES.holdingStatsContainer}>
      <View style={STYLES.statistic}>
        <Text style={TYPOGRAPHY.body2}>Total Cost</Text>
        <Text style={TYPOGRAPHY.body1}>{formatPrice(holdingOverview?.totalCost, false, selectedCurrency)}</Text>
      </View>
      <View style={STYLES.statistic}>
        <Text style={TYPOGRAPHY.body2}>Average Cost</Text>
        <Text style={TYPOGRAPHY.body1}>{formatPrice(holdingOverview?.avgCost, false, selectedCurrency)}</Text>
      </View>
      <View style={STYLES.statistic}>
        <Text style={TYPOGRAPHY.body2}>Holdings Value</Text>
        <Text style={TYPOGRAPHY.body1}>{formatPrice(holdingOverview?.totalValue, false, selectedCurrency)}</Text>
      </View>
      <View style={STYLES.statistic}>
        <Text style={TYPOGRAPHY.body2}>Total Holdings</Text>
        <Text style={TYPOGRAPHY.body1}>
          {formatNum(holdingOverview?.amount)} {holdingOverview?.coinSymbol}
        </Text>
      </View>
      <View style={STYLES.statisticWithNoMargin}>
        <Text style={TYPOGRAPHY.body2}>Profit/Loss</Text>
        <Text style={[getStylesBasedOnSignWorklet(holdingOverview?.profitLoss?.percentChange), TYPOGRAPHY.body1]}>
          {formatPrice(holdingOverview?.profitLoss?.value, true, selectedCurrency)} (
          {formatPercent(holdingOverview?.profitLoss?.percentChange)})
        </Text>
      </View>
      <View style={STYLES.statisticWithNoMargin}>
        <Text style={TYPOGRAPHY.body2}>Current Price</Text>
        <Text style={TYPOGRAPHY.body1}>{formatPrice(holdingOverview?.priceUSD?.value, false, selectedCurrency)}</Text>
      </View>
    </View>
  </View>
);

const Header = ({ holdingOverview, isLoading, selectedCurrency }) => {
  return (
    <Card style={STYLES.card}>
      <Card.Content>
        {isLoading || isNullOrUndefined(holdingOverview) ? (
          <StatisticsSkeleton />
        ) : (
          <Statistics holdingOverview={holdingOverview} selectedCurrency={selectedCurrency} />
        )}
      </Card.Content>
    </Card>
  );
};

const STYLES = StyleSheet.create({
  card: { marginBottom: GLOBAL_CONSTANTS.MD_MARGIN },
  holdingStatsContainer: { flexDirection: "row", flexWrap: "wrap" },
  statistic: { width: "50%", marginBottom: GLOBAL_CONSTANTS.SM_MARGIN },
  statisticWithNoMargin: { width: "50%" },
  statisticSkeleton: { width: "100%", height: 20, marginBottom: GLOBAL_CONSTANTS.MD_MARGIN },
  lastRowStatisticSkeleton: { width: "100%", height: 20 }
});

const mapStateToProps = (state) => ({
  selectedCurrency: selectSelectedCurrency(state)
});

export default connect(mapStateToProps)(Header);
