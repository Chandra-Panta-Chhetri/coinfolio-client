import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Paragraph, Subheading, useTheme } from "react-native-paper";
import { connect } from "react-redux";
import GlobalStyles from "../../../GlobalStyles";
import {
  selectIsLoadingPortfolio,
  selectCurrentPortfolioValue
} from "../../../redux/portfolio/portfolio.selectors";
import CurrentValueSkeleton from "./Skeleton";
import {
  appendPlusOrMinus,
  getStylesBasedOnPosOrNeg
} from "../../../GlobalUtils";

const CurrentValue = ({ currentValue, isLoading }) => {
  const { colors } = useTheme();

  if (isLoading && currentValue === null) {
    return <CurrentValueSkeleton />;
  }

  return (
    <Card style={[GlobalStyles.componentContainer, GlobalStyles.borderRadius]}>
      <Card.Content>
        <Paragraph style={GlobalStyles.subheading}>Current Value</Paragraph>
        <View style={styles.valueAndPercent}>
          <Subheading style={GlobalStyles.title}>
            ${currentValue.value}
          </Subheading>
          <Subheading
            style={[
              GlobalStyles.subheading,
              getStylesBasedOnPosOrNeg(currentValue.percent)
            ]}
          >
            {appendPlusOrMinus(currentValue.percent)}%
          </Subheading>
        </View>
        <Paragraph
          style={[
            GlobalStyles.caption,
            getStylesBasedOnPosOrNeg(currentValue.plChange)
          ]}
        >
          {appendPlusOrMinus(currentValue.plChange, " $")} (24h)
        </Paragraph>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  valueAndPercent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }
});

const mapStateToProps = (state) => ({
  currentValue: selectCurrentPortfolioValue(state),
  isLoading: selectIsLoadingPortfolio(state)
});

export default connect(mapStateToProps)(CurrentValue);
