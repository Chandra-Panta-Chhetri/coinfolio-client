import React, { useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { Card } from "react-native-paper";
import LineChart from "./RainbowChart/LineChart";

import dummydata from "./RainbowChart/dummydata.json";
const values = dummydata.data.prices;
const graphs = [
  {
    label: "1h",
    data: values.hour
  },
  {
    label: "1d",
    data: values.day
  },
  {
    label: "1m",
    data: values.month
  },
  {
    label: "1y",
    data: values.year
  },
  {
    label: "All",
    data: values.all
  }
];

const PortfolioLineChart = () => {
  const [data, setData] = useState(graphs);

  useEffect(() => {}, []);

  return (
    <Card style={styles.cardContainer}>
      <Card.Content style={styles.cardBody}>
        <LineChart data={data} chartStyle={styles.lineChart} />
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 10,
    borderRadius: 13
  },
  cardBody: {
    flexDirection: "row",
    alignItems: "center"
  },
  lineChart: {
    width: "100%",
    height: 180
  }
});

export default PortfolioLineChart;
