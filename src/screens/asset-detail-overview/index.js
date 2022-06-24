import React, { useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { LineChart, MultiColumnView, OutlinedText } from "../../shared-components";

import dummydata from "../../redux/portfolio/dummydata.json";
import { GLOBAL_STYLES, TYPOGRAPHY } from "../../styles";
import { GLOBAL_CONSTANTS } from "../../constants";

const values = dummydata.data.prices;
const historicValue = [
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
  <View key={label} style={STYLES.statistic}>
    <Text style={TYPOGRAPHY.body1} numberOfLines={1}>
      {label}
    </Text>
    <Text style={TYPOGRAPHY.body1} numberOfLines={1}>
      {value}
    </Text>
  </View>
);

const AssetDetailOverviewScreen = () => {
  const { colors } = useTheme();

  useEffect(() => {}, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={STYLES.container}>
      <View style={STYLES.header}>
        <View style={STYLES.nameRank}>
          <Text style={STYLES.fullName} numberOfLines={1}>
            Bitcoin
          </Text>
          <OutlinedText text={"1"} style={TYPOGRAPHY.caption} />
        </View>
        <Text style={TYPOGRAPHY.display1} numberOfLines={1}>
          $20,600.11
        </Text>
      </View>
      <LineChart
        data={historicValue}
        chartStyle={STYLES.lineChart}
        xValueAccessor={xValueAccessor}
        yValueAccessor={yValueAccessor}
        percentChangeAccessor={percentChangeAccessor}
        dataPointsAccessor={dataPointsAccessor}
      />
      <View style={STYLES.statsContainer}>
        <Text style={STYLES.statsHeading}>Statistics</Text>
        <MultiColumnView
          sections={STATS_SECTIONS}
          renderItem={Statistic}
          SectionSeparator={() => <View style={[STYLES.statsSeparator, { borderColor: colors.text }]} />}
        />
      </View>
    </ScrollView>
  );
};

const STYLES = StyleSheet.create({
  statsHeading: {
    ...TYPOGRAPHY.headline,
    marginBottom: GLOBAL_CONSTANTS.MD_MARGIN
  },
  container: {
    ...GLOBAL_STYLES.screenContainer,
    paddingTop: 0
  },
  fullName: {
    ...TYPOGRAPHY.subheading,
    marginRight: GLOBAL_CONSTANTS.SM_MARGIN
  },
  nameRank: { flexDirection: "row", alignItems: "center" },
  statsContainer: {
    marginTop: GLOBAL_CONSTANTS.LG_MARGIN
  },
  statsSeparator: { borderWidth: 1, marginRight: GLOBAL_CONSTANTS.MD_MARGIN },
  statistic: {
    marginBottom: GLOBAL_CONSTANTS.SM_MARGIN
  },
  lineChart: {
    width: "100%",
    height: 180
  }
});

export default AssetDetailOverviewScreen;
