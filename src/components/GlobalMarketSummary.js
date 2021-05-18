import React, { useState } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import { Card, Paragraph } from "react-native-paper";
import { connect } from "react-redux";
import {
  selectGlobalSummary,
  selectIsLoadingSummary
} from "../redux/summary/summary.selectors";
import { startGlobalSummaryFetch } from "../redux/summary/summary.actions";

const GlobalMarketSummary = ({
  globalSummary,
  fetchGlobalSummary,
  isLoading
}) => {
  if (isLoading) {
    return null;
  }

  return (
    <Card style={styles.container}>
      <Card.Content>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.summaryItem}>
            <Paragraph style={styles.summaryLabel}>Market Cap: </Paragraph>
            <Paragraph style={styles.summaryValue}>
              ${globalSummary["marketCap"]}
            </Paragraph>
          </View>
          <View style={styles.summaryItem}>
            <Paragraph style={styles.summaryLabel}>24h Vol: </Paragraph>
            <Paragraph style={styles.summaryValue}>
              ${globalSummary["24hVolume"]}
            </Paragraph>
          </View>
          <View style={styles.summaryItem}>
            <Paragraph style={styles.summaryLabel}>BTC Dominance: </Paragraph>
            <Paragraph style={styles.summaryValue}>
              {globalSummary["btcDominance"]}%
            </Paragraph>
          </View>
          <View style={styles.summaryItem}>
            <Paragraph style={styles.summaryLabel}>ETH Dominance: </Paragraph>
            <Paragraph style={styles.summaryValue}>
              {globalSummary["ethDominance"]}%
            </Paragraph>
          </View>
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
  container: {},
  summaryLabel: {
    fontWeight: "bold"
  },
  summaryValue: {
    color: "darkgray"
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
