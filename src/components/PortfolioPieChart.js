import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Card, Paragraph } from "react-native-paper";
import PieChart from "./PieChart";
import TouchableNativeOpacity from "./TouchableNativeOpacity";

const innerLabelConfig = {
  textAnchor: "middle",
  fill: "black",
  dy: "0.50em",
  fontSize: 16,
  fontWeight: "bold"
};

const Labels = ({
  data = [],
  selectedSlice = null,
  changeSelectedSlice = () => {}
}) => {
  return (
    <ScrollView
      contentContainerStyle={styles.pieChartLabels}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {data.map((pieSlice, i) => {
        return (
          <TouchableNativeOpacity
            key={pieSlice.key}
            activeOpacity={0.6}
            onPress={() => changeSelectedSlice(i, false)}
            viewContainerStyle={styles.touchableOpacityContainer}
          >
            <View
              style={[
                styles.pieChartLabelContainer,
                i === selectedSlice ? styles.activeLabel : null
              ]}
            >
              <View
                style={[
                  styles.pieSliceDot,
                  { backgroundColor: pieSlice.svg.fill }
                ]}
              />
              <Paragraph style={styles.pieChartLabel}>{pieSlice.key}</Paragraph>
            </View>
          </TouchableNativeOpacity>
        );
      })}
    </ScrollView>
  );
};

const getInnerLabelText = (selectedSlice) =>
  `${selectedSlice.key} - ${selectedSlice.value}%`;

const PortfolioPieChart = () => {
  const [data, setData] = useState([
    { percent: 50, ticker: "ETH" },
    { percent: 20, ticker: "BTC" },
    { percent: 10, ticker: "ADA" },
    { percent: 10, ticker: "XLM" },
    { percent: 10, ticker: "THETA" }
  ]);
  const [selectedSlice, setSelectedSlice] = useState(null);

  const changeSelectedSlice = (index, allowToggle = true) => {
    if (selectedSlice !== index) {
      return setSelectedSlice(index);
    }

    if (allowToggle) {
      setSelectedSlice(null);
    }
  };

  const colors = ["#21e6c1", "#278ea5", "#1f4287", "#071e3d", "#28c7fa"];

  const pieData = data.map((value, index) => ({
    value: value.percent,
    svg: {
      fill: colors[index],
      onPress: () => changeSelectedSlice(index)
    },
    key: `${value.ticker}`
  }));

  useEffect(() => {}, []);

  return (
    <Card style={styles.cardContainer}>
      <Card.Content>
        <PieChart
          style={styles.pieChart}
          data={pieData}
          padAngle={0.05}
          innerRadius="75%"
          selectedSlice={selectedSlice}
          innerLabelConfig={innerLabelConfig}
          getInnerLabelText={getInnerLabelText}
        />
        <Labels
          data={pieData}
          selectedSlice={selectedSlice}
          changeSelectedSlice={changeSelectedSlice}
        />
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 10,
    borderRadius: 13
  },
  pieChart: {
    height: 180,
    width: "100%"
  },
  pieChartLabels: {
    marginTop: 10,
    flexGrow: 1
  },
  pieChartLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 2,
    paddingHorizontal: 4,
    justifyContent: "center"
  },
  pieChartLabel: {
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1
  },
  activeLabel: {
    backgroundColor: "#D8D8D8",
    borderRadius: 5
  },
  pieSliceDot: {
    width: 10,
    height: 5,
    borderRadius: 5,
    marginRight: 4
  },
  touchableOpacityContainer: { marginRight: 0 }
});

export default PortfolioPieChart;
