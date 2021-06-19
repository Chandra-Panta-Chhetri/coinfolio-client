import React, { useState } from "react";
import { StyleSheet, Text } from "react-native";
import { Card } from "react-native-paper";
import PieChart from "./PieChart";

const PortfolioPieChart = () => {
  const [selectedSlice, setSelectedSlice] = useState(null);

  const data = [50, 10, 40, 95, 10];
  const colors = ["#21e6c1", "#278ea5", "#1f4287", "#071e3d", "#28c7fa"];

  const pieData = data.map((value, index) => ({
    value,
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
    key: `pie-${index}`
  }));

  return (
    <Card style={styles.cardContainer}>
      <Card.Content style={styles.cardBody}>
        <PieChart
          style={{ height: 160, width: "100%" }}
          data={pieData}
          padAngle={0.06}
          innerRadius="75%"
          selectedSlice={selectedSlice}
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
  }
});

export default PortfolioPieChart;
