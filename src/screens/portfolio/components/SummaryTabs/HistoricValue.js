import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import { connect } from "react-redux";
import { GLOBAL_STYLES } from "../../../../styles";
import { selectPortfolioHistoricValue } from "../../../../redux/portfolio";
import { LineChart } from "../../../../shared-components";
import { GLOBAL_CONSTANTS } from "../../../../constants";

const xValueAccessor = (dataInstance) => dataInstance[1];
const yValueAccessor = (dataInstance) => dataInstance[0];
const percentChangeAccessor = (data) => data.percent_change;
const dataPointsAccessor = (data) => data.prices;

const HistoricValue = ({ historicValue = [] }) => {
  useEffect(() => {
    console.log("historic value mounted");
  }, []);

  return (
    <Card style={STYLES.cardContainer}>
      <Card.Content>
        <LineChart
          data={historicValue}
          chartStyle={STYLES.lineChart}
          xValueAccessor={xValueAccessor}
          yValueAccessor={yValueAccessor}
          percentChangeAccessor={percentChangeAccessor}
          dataPointsAccessor={dataPointsAccessor}
        />
      </Card.Content>
    </Card>
  );
};

const STYLES = StyleSheet.create({
  lineChart: {
    width: "100%",
    height: 180
  },
  cardContainer: {
    borderRadius: GLOBAL_CONSTANTS.BORDER_RADIUS
  }
});

const mapStateToProps = (state) => ({
  historicValue: selectPortfolioHistoricValue(state)
});

export default connect(mapStateToProps)(HistoricValue);
