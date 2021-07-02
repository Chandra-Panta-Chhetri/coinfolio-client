import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Card, Title } from "react-native-paper";
import LineChart from "./RainbowChart/Graph";

const PortfolioLineChart = () => {
  useEffect(() => {
    console.log("rerendering line chart component");
  }, []);

  return (
    <Card style={styles.cardContainer}>
      <Card.Content style={styles.cardBody}>
        <LineChart />
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
  }
});

export default PortfolioLineChart;
