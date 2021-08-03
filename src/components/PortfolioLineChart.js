import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import LineChart from "./RainbowChart/LineChart";

import dummydata from "./RainbowChart/dummydata.json";
const values = dummydata.data.prices;
const graphs = [
  {
    label: "1h",
    data: values.hour,
    defaultTimeLabel: "Past Hour"
  },
  {
    label: "1d",
    data: values.day,
    defaultTimeLabel: "Yesterday"
  },
  {
    label: "1m",
    data: values.month,
    defaultTimeLabel: "Past Month"
  },
  {
    label: "1y",
    data: values.year,
    defaultTimeLabel: "Past Year"
  },
  {
    label: "All",
    data: values.all,
    defaultTimeLabel: "All Time"
  }
];

const xValueAccessor = (dataInstance) => dataInstance[1];
const yValueAccessor = (dataInstance) => dataInstance[0];
const percentChangeAccessor = (data) => data.percent_change;
const dataPointsAccessor = (data) => data.prices;

const PortfolioLineChart = () => {
  const [data, setData] = useState(graphs);

  useEffect(() => {}, []);

  return (
    <Card style={styles.cardContainer}>
      <Card.Content>
        <LineChart
          data={data}
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
  cardContainer: {},
  lineChart: {
    width: "100%",
    height: 180
  }
});

export default PortfolioLineChart;
