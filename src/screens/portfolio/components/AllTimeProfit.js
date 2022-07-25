import React from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { selectOverallProfit, selectIsLoadingPortfolio } from "../../../redux/portfolio";
import { Text } from "react-native-paper";
import { TYPOGRAPHY } from "../../../styles";
import { addNumSign, getStylesBasedOnSign } from "../../../utils";

const AllTimeProfit = ({ isLoading, overallProfit, width = "100%" }) => {
  return (
    <View style={{ width }}>
      <Text style={TYPOGRAPHY.subheading}>Total Profit/Loss</Text>
      <View style={STYLES.profitAndPercent}>
        <Text style={TYPOGRAPHY.title}>${overallProfit.value}</Text>
        <Text style={[TYPOGRAPHY.subheading, getStylesBasedOnSign(overallProfit.percentChange)]}>
          {addNumSign(overallProfit.percentChange)}%
        </Text>
      </View>
    </View>
  );
};

const STYLES = StyleSheet.create({
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
