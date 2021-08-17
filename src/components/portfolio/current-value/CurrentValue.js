import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Paragraph, Subheading, useTheme } from "react-native-paper";
import { connect } from "react-redux";
import CONSTANTS from "../../../Constants";
import {
  selectIsLoadingPortfolio,
  selectCurrentPortfolioValue
} from "../../../redux/portfolio/portfolio.selectors";
import CurrentValueSkeleton from "./Skeleton";

const CurrentValue = ({ currentValue, isLoading }) => {
  const { colors } = useTheme();

  if (isLoading && currentValue === null) {
    return <CurrentValueSkeleton />;
  }

  return (
    <Card style={styles.container}>
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
  container: { marginBottom: CONSTANTS.PORTFOLIO.MARGIN_BOTTOM },
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

export default connect(mapStateToProps)(CurrentValue);
