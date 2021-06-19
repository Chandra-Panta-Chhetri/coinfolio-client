import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import PieChart from "./PieChart";

const innerLabelConfig = {
  textAnchor: "middle",
  fill: "black",
  dy: "0.50em",
  fontSize: 16,
  fontWeight: "bold"
};

const PortfolioPieChart = () => {
  const [selectedSlice, setSelectedSlice] = useState(null);

  const data = [
    { percent: 50, ticker: "ETH" },
    { percent: 20, ticker: "BTC" },
    { percent: 10, ticker: "ADA" },
    { percent: 10, ticker: "XLM" },
    { percent: 10, ticker: "THETA" }
  ];
  const colors = ["#21e6c1", "#278ea5", "#1f4287", "#071e3d", "#28c7fa"];

  const pieData = data.map((value, index) => ({
    value: value.percent,
    svg: {
      fill: colors[index],
      onPress: () => {
        if (selectedSlice !== index) {
          setSelectedSlice(index);
        } else {
          setSelectedSlice(null);
        }
      }
    },
    key: `${value.ticker}`
  }));

  return (
    <Card style={styles.cardContainer}>
      <Card.Content style={styles.cardBody}>
        <PieChart
          style={styles.pieChart}
          data={pieData}
          padAngle={0.06}
          innerRadius="75%"
          selectedSlice={selectedSlice}
          innerLabelConfig={innerLabelConfig}
        ></PieChart>
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
    justifyContent: "center"
  },
  pieChart: {
    height: 170,
    width: "100%"
  }
});

export default PortfolioPieChart;
