import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Title } from "react-native-paper";

const PortfolioLineChart = () => {
  return (
    <Card style={styles.cardContainer}>
      <Card.Content style={styles.cardBody}>
        <Title>Portfolio Line Chart</Title>
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
