import React, { useEffect } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import { Card, Text } from "react-native-paper";
import { connect } from "react-redux";
import { GLOBAL_CONSTANTS } from "../../../constants";
import { selectGlobalSummary, selectIsLoadingGlobal, startGlobalSummaryFetch } from "../../../redux/summary";
import { Skeleton } from "../../../shared-components";
import { TYPOGRAPHY } from "../../../styles";

const MarketSummarySkeleton = () => (
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

  if (isLoading || globalSummary === null) {
    return <MarketSummarySkeleton />;
  }

  return (
    <Card style={STYLES.container}>
      <Card.Content>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {Object.keys(globalSummary).map((key) => (
            <View style={STYLES.summaryItem} key={globalSummary[key].label}>
              <Text style={TYPOGRAPHY.body2}>{globalSummary[key].label}: </Text>
              <Text style={TYPOGRAPHY.body2}>{globalSummary[key].value}</Text>
            </View>
          ))}
        </ScrollView>
      </Card.Content>
    </Card>
  );
};

const STYLES = StyleSheet.create({
  summaryItem: {
    marginRight: GLOBAL_CONSTANTS.MD_MARGIN,
    flexDirection: "row"
  },
  globalSkeleton: {
    borderRadius: GLOBAL_CONSTANTS.BORDER_RADIUS,
    height: 20,
    flex: 1
  },
  rowFlexbox: {
    flexDirection: "row"
  },
  container: {
    borderRadius: GLOBAL_CONSTANTS.BORDER_RADIUS,
    marginBottom: GLOBAL_CONSTANTS.LG_MARGIN
  }
});

const mapStateToProps = (state) => ({
  globalSummary: selectGlobalSummary(state),
  isLoading: selectIsLoadingGlobal(state)
});

const mapDispatchToProps = (dispatch) => ({
  fetchGlobalSummary: () => dispatch(startGlobalSummaryFetch())
});

export default connect(mapStateToProps, mapDispatchToProps)(GlobalMarketSummary);
