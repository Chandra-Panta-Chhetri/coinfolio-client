import React, { useEffect } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import { Card, Text } from "react-native-paper";
import { connect } from "react-redux";
import { selectGlobalSummary, selectIsLoadingSummary, startGlobalSummaryFetch } from "../../../redux/summary";
import { Skeleton } from "../../../shared-components";
import { GLOBAL_STYLES, TYPOGRAPHY } from "../../../styles";

const METRICS = [
  {
    label: "Market Cap",
    key: "marketCap"
  },
  {
    label: "24h Vol",
    key: "24hVolume"
  },
  {
    label: "BTC Dominance",
    key: "btcDominance"
  },
  {
    label: "ETH Dominance",
    key: "ethDominance"
  }
];

const GlobalMarketSummarySkeleton = () => (
  <Card style={STYLES.container}>
    <Card.Content style={STYLES.rowFlexbox}>
      <Skeleton style={STYLES.globalSkeleton} />
    </Card.Content>
  </Card>
);

const GlobalMarketSummary = ({ globalSummary, fetchGlobalSummary, isLoading }) => {
  useEffect(() => {
    fetchGlobalSummary();
  }, []);

  if (isLoading && globalSummary === null) {
    return <GlobalMarketSummarySkeleton />;
  }

  return (
    <Card style={STYLES.container}>
      <Card.Content>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {METRICS.map((m) => (
            <View style={STYLES.summaryItem} key={m.label}>
              <Text style={TYPOGRAPHY.body2}>{m.label}: </Text>
              <Text style={TYPOGRAPHY.body2}>{globalSummary[m.key]}</Text>
            </View>
          ))}
        </ScrollView>
      </Card.Content>
    </Card>
  );
};

const STYLES = StyleSheet.create({
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

export default connect(mapStateToProps, mapDispatchToProps)(GlobalMarketSummary);
