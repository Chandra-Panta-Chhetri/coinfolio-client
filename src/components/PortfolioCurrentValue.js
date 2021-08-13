import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Paragraph, Subheading } from "react-native-paper";
import { connect } from "react-redux";
import {
  selectIsLoadingPortfolio,
  selectCurrentPortfolioValue
} from "../redux/portfolio/portfolio.selectors";
import PortfolioValueSkeleton from "./PortfolioValueCardSkeleton";

const PortfolioValueCard = ({ currentValue, isLoading }) => {
  if (isLoading && currentValue === null) {
    return <PortfolioValueSkeleton />;
  }

  return (
    <Card>
      <Card.Content>
        <Paragraph style={styles.label}>Current Value</Paragraph>
        <View style={styles.valueAndPercent}>
          <Subheading style={styles.value}>${currentValue.value}</Subheading>
          <Subheading
            style={[
              styles.percent,
              { color: currentValue.percent > 0 ? "green" : "red" }
            ]}
          >
            +{currentValue.percent}%
          </Subheading>
        </View>
        <Paragraph style={styles.plChange}>
          {currentValue.plChange >= 0 ? "+" : ""}${currentValue.plChange} (24h)
        </Paragraph>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  label: {
    fontWeight: "bold",
    letterSpacing: 1,
    fontSize: 15
  },
  valueAndPercent: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5
  },
  value: {
    fontWeight: "bold",
    fontSize: 22,
    letterSpacing: 1
  },
  percent: {
    fontWeight: "bold",
    letterSpacing: 1,
    fontSize: 16
  },
  plChange: {
    marginVertical: 0
  }
});

const mapStateToProps = (state) => ({
  currentValue: selectCurrentPortfolioValue(state),
  isLoading: selectIsLoadingPortfolio(state)
});

export default connect(mapStateToProps)(PortfolioValueCard);
