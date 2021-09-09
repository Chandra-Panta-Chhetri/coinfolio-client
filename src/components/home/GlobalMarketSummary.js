import React, { useEffect } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import { Card, Text } from "react-native-paper";
import { connect } from "react-redux";
import {
  selectGlobalSummary,
  selectIsLoadingSummary
} from "../../redux/summary/summary.selectors";
import { startGlobalSummaryFetch } from "../../redux/summary/summary.actions";
import Skeleton from "../shared/Skeleton";
import CONSTANTS from "../../Constants";
import GlobalStyles from "../../GlobalStyles";

const GlobalMarketSummarySkeleton = () => (
  <Card style={[GlobalStyles.borderRadius, GlobalStyles.componentContainer]}>
    <Card.Content style={styles.rowFlexbox}>
      <Skeleton style={[styles.globalSkeleton, GlobalStyles.borderRadius]} />
    </Card.Content>
  </Card>
);

const GlobalMarketSummary = ({
  globalSummary,
  fetchGlobalSummary,
  isLoading
}) => {
  useEffect(() => {
    //fetchGlobalSummary();
  }, []);

  if (isLoading && globalSummary === null) {
    return <GlobalMarketSummarySkeleton />;
  }

  return (
    <Card style={[GlobalStyles.borderRadius, GlobalStyles.componentContainer]}>
      <Card.Content>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {CONSTANTS.GLOBAL_MARKET_SUMMARY.METRICS.map((metric) => (
            <View style={styles.summaryItem} key={metric.label}>
              <Text style={[GlobalStyles.body2]}>{metric.label}: </Text>
              <Text style={[GlobalStyles.body2]}>
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
    height: 20,
    flex: 1
  },
  rowFlexbox: {
    flexDirection: "row"
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
