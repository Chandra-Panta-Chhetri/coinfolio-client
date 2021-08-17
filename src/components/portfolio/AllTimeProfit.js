import React from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import {
  selectOverallProfit,
  selectIsLoadingPortfolio
} from "../../redux/portfolio/portfolio.selectors";
import { Subheading, Card, Paragraph } from "react-native-paper";
import CONSTANTS from "../../Constants";

const AllTimeProfit = ({ isLoading, overallProfit }) => {
  const isPositivePercent = overallProfit.percentChange >= 0;

  return (
    <Card style={styles.container}>
      <Card.Content>
        <Paragraph style={styles.overallLabel}>Total Profit/Loss</Paragraph>
        <View style={styles.overallProfitAndPercent}>
          <Subheading style={styles.overallText}>
            ${overallProfit.value}
          </Subheading>
          <Subheading
            style={[
              styles.overallText,
              { color: isPositivePercent ? "green" : "red" }
            ]}
          >
            {isPositivePercent ? "+" : ""}
            {overallProfit.percentChange}%
          </Subheading>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: CONSTANTS.PORTFOLIO.MARGIN_BOTTOM
  },
  overallProfitAndPercent: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  overallText: {
    fontWeight: "bold",
    letterSpacing: 1,
    fontSize: 16
  },
  overallLabel: {
    fontWeight: "bold",
    letterSpacing: 1,
    fontSize: 15
  }
});

const mapStateToProps = (state) => ({
  overallProfit: selectOverallProfit(state),
  isLoading: selectIsLoadingPortfolio(state)
});

export default connect(mapStateToProps)(AllTimeProfit);
