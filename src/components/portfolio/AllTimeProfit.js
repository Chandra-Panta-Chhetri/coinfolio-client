import React from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import {
  selectOverallProfit,
  selectIsLoadingPortfolio
} from "../../redux/portfolio/portfolio.selectors";
import { Subheading, Paragraph } from "react-native-paper";
import GlobalStyles from "../../GlobalStyles";
import { appendPlusOrMinus, getStylesBasedOnPosOrNeg } from "../../GlobalUtils";

const AllTimeProfit = ({ isLoading, overallProfit, width = "100%" }) => {
  return (
    <View style={{ width }}>
      <Paragraph style={GlobalStyles.subheading}>Total Profit/Loss</Paragraph>
      <View style={styles.profitAndPercent}>
        <Subheading style={GlobalStyles.title}>
          ${overallProfit.value}
        </Subheading>
        <Subheading
          style={[
            GlobalStyles.subheading,
            getStylesBasedOnPosOrNeg(overallProfit.percentChange)
          ]}
        >
          {appendPlusOrMinus(overallProfit.percentChange)}%
        </Subheading>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profitAndPercent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }
});

const mapStateToProps = (state) => ({
  overallProfit: selectOverallProfit(state),
  isLoading: selectIsLoadingPortfolio(state)
});

export default connect(mapStateToProps)(AllTimeProfit);
