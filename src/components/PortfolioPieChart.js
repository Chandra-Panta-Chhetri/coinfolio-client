import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Card } from "react-native-paper";
import PieChart from "./PieChart";

const PortfolioPieChart = () => {
  const data = [50, 10, 40, 95, 10];
  const randomColor = () =>
    ("#" + ((Math.random() * 0xffffff) << 0).toString(16) + "000000").slice(
      0,
      7
    );

  const pieData = data
    .filter((value) => value > 0)
    .map((value, index) => ({
      value,
      svg: {
        fill: randomColor(),
        onPress: () => {
          console.log(index + "clicked");
        }
      },
      key: `pie-${index}`
    }));

  return (
    <Card style={styles.cardContainer}>
      <Card.Content
        style={styles.cardBody}
        onLayout={(event) =>
          console.log(
            event.nativeEvent.layout.width,
            event.nativeEvent.layout.height
          )
        }
      >
        <PieChart
          style={{ height: 150, width: "100%" }}
          data={pieData}
          padAngle={0.06}
          innerRadius="75%"
        >
          <Text>Hi</Text>
        </PieChart>
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

export default PortfolioPieChart;
