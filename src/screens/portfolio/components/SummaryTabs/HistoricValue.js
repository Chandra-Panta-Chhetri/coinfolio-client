import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import { connect } from "react-redux";
import { GLOBAL_STYLES } from "../../../../styles";
import { selectPortfolioHistoricValue } from "../../../../redux/portfolio";
import { LineChart } from "../../../../shared-components";

const xValueAccessor = (dataInstance) => dataInstance[1];
const yValueAccessor = (dataInstance) => dataInstance[0];
const percentChangeAccessor = (data) => data.percent_change;
const dataPointsAccessor = (data) => data.prices;

const HistoricValue = ({ historicValue = [] }) => {
  useEffect(() => {}, []);

  return (
    <Card style={GLOBAL_STYLES.borderRadius}>
      <Card.Content>
        <LineChart
          data={historicValue}
          chartStyle={styles.lineChart}
          xValueAccessor={xValueAccessor}
          yValueAccessor={yValueAccessor}
          percentChangeAccessor={percentChangeAccessor}
          dataPointsAccessor={dataPointsAccessor}
        />
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  lineChart: {
    width: "100%",
    height: 180
  }
});

const mapStateToProps = (state) => ({
  historicValue: selectPortfolioHistoricValue(state)
});

export default connect(mapStateToProps)(HistoricValue);
