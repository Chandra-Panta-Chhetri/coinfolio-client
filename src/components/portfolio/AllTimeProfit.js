import React from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import {
  selectOverallProfit,
  selectIsLoadingPortfolio
} from "../../redux/portfolio/portfolio.selectors";
import { Subheading, Card, Paragraph } from "react-native-paper";
import GlobalStyles from "../../GlobalStyles";
import { appendPlusOrMinus, getStylesBasedOnPosOrNeg } from "../../GlobalUtils";

const AllTimeProfit = ({ isLoading, overallProfit }) => {
  return (
    <Card
      style={[GlobalStyles.borderRadius, GlobalStyles.portfolioElementMargin]}
    >
      <Card.Content>
        <Paragraph style={styles.label}>Total Profit/Loss</Paragraph>
        <View style={styles.profitAndPercent}>
          <Subheading style={styles.text}>${overallProfit.value}</Subheading>
          <Subheading
            style={[
              styles.text,
              getStylesBasedOnPosOrNeg(overallProfit.percentChange)
            ]}
          >
            {appendPlusOrMinus(overallProfit.percentChange)}%
          </Subheading>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  profitAndPercent: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  text: {
    fontWeight: "bold",
    letterSpacing: 1,
    fontSize: 16
  },
  label: {
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
