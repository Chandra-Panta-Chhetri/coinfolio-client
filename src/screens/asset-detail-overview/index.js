import React, { useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { LineChart, MultiColumnView, OutlinedText } from "../../shared-components";

import dummydata from "../../redux/portfolio/dummydata.json";
import { GLOBAL_STYLES } from "../../styles";

const values = dummydata.data.prices;
const historicValue = [
  {
    label: "1h",
    data: values.hour,
    defaultTimeLabel: "Past Hour"
  },
  {
    label: "1d",
    data: values.day,
    defaultTimeLabel: "Past Day"
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

const STATS_SECTIONS = [
  {
    data: [
      { label: "Market Cap", value: "$300 Bn" },
      { label: "Volume 24h", value: "$30 Bn" },
      { label: "Max Supply", value: "21.00 M" }
    ]
  },
  {
    data: [
      { label: "Total Supply", value: "19.07 M" },
      { label: "Dominance", value: "40%" },
      { label: "All Time High", value: "$25,323.23" }
    ]
  }
];

const Statistic = ({ label, value }) => (
  <View key={label}>
    <Text>{label}</Text>
    <Text>{value}</Text>
  </View>
);

const AssetDetailOverviewScreen = () => {
  useEffect(() => {}, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={STYLES.container}>
      <View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text>Bitcoin</Text>
          <OutlinedText text={"1"} />
        </View>
        <Text>$20,600.11</Text>
      </View>
      <LineChart
        data={historicValue}
        chartStyle={STYLES.lineChart}
        xValueAccessor={xValueAccessor}
        yValueAccessor={yValueAccessor}
        percentChangeAccessor={percentChangeAccessor}
        dataPointsAccessor={dataPointsAccessor}
      />
      <View>
        <Text>Statistics</Text>
        <MultiColumnView
          sections={STATS_SECTIONS}
          renderItem={Statistic}
          SectionSeparator={() => <View style={{ borderWidth: 1, borderColor: "black", marginRight: 10 }} />}
        />
      </View>
    </ScrollView>
  );
};

const STYLES = StyleSheet.create({
  container: {
    ...GLOBAL_STYLES.screenContainer,
    paddingTop: 0,
    ...{ borderColor: "red", borderWidth: 1 }
  },
  lineChart: {
    width: "100%",
    height: 180
  }
});

export default AssetDetailOverviewScreen;
