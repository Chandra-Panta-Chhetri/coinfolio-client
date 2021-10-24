import React, { useEffect } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import { Card, Text } from "react-native-paper";
import { connect } from "react-redux";
import {
  selectGlobalSummary,
  selectIsLoadingSummary,
  startGlobalSummaryFetch
} from "../../../redux/summary";
import { Skeleton } from "../../../shared-components";
import { GLOBAL_STYLES, TYPOGRAPHY } from "../../../styles";

const METRICS = [
  {
    label: "Market Cap",
    valueAccessorFunc: (summary) => `$${summary["marketCap"]}`
  },
  {
    label: "24h Vol",
    valueAccessorFunc: (summary) => `$${summary["24hVolume"]}`
  },
  {
    label: "BTC Dominance",
    valueAccessorFunc: (summary) => `${summary["btcDominance"]}%`
  },
  {
    label: "ETH Dominance",
    valueAccessorFunc: (summary) => `${summary["ethDominance"]}%`
  }
];

const GlobalMarketSummarySkeleton = () => (
  <Card style={styles.container}>
    <Card.Content style={styles.rowFlexbox}>
      <Skeleton style={styles.globalSkeleton} />
    </Card.Content>
  </Card>
);

const GlobalMarketSummary = ({
  globalSummary,
  fetchGlobalSummary,
  isLoading
}) => {
  useEffect(() => {
    fetchGlobalSummary();
  }, []);

  if (isLoading && globalSummary === null) {
    return <GlobalMarketSummarySkeleton />;
  }

  return (
    <Card style={styles.container}>
      <Card.Content>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {METRICS.map((metric) => (
            <View style={styles.summaryItem} key={metric.label}>
              <Text style={TYPOGRAPHY.body2}>{metric.label}: </Text>
              <Text style={TYPOGRAPHY.body2}>
                {metric.valueAccessorFunc(globalSummary)}
              </Text>
            </View>
          ))}
        </ScrollView>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  summaryItem: {
    marginRight: 10,
    flexDirection: "row"
  },
  globalSkeleton: {
    ...GLOBAL_STYLES.borderRadius,
    height: 20,
    flex: 1
  },
  rowFlexbox: {
    flexDirection: "row"
  },
  container: {
    ...GLOBAL_STYLES.borderRadius,
    ...GLOBAL_STYLES.componentContainer
  }
});

const mapStateToProps = (state) => ({
  globalSummary: selectGlobalSummary(state),
  isLoading: selectIsLoadingSummary(state)
});

const mapDispatchToProps = (dispatch) => ({
  fetchGlobalSummary: () => dispatch(startGlobalSummaryFetch())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GlobalMarketSummary);
