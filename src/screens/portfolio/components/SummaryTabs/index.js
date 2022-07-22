import React from "react";
import { StyleSheet, View } from "react-native";
import { Tabs } from "../../../../shared-components";
import HistoricValue from "./HistoricValue";
import Allocations from "./Allocations";
import { Entypo } from "@expo/vector-icons";
import { GLOBAL_STYLES } from "../../../../styles";
import { GLOBAL_CONSTANTS } from "../../../../constants";

const TAB_ICON_SIZE = 20;

const SummaryTabs = () => {
  return (
    <View style={STYLES.container}>
      <Tabs tabHeadingMarginBottom={10}>
        <HistoricValue tabLabel="Historic Value" iconComponent={<Entypo name="line-graph" size={TAB_ICON_SIZE} />} />
        <Allocations tabLabel="Allocations" iconComponent={<Entypo name="pie-chart" size={TAB_ICON_SIZE} />} />
      </Tabs>
    </View>
  );
};

const STYLES = StyleSheet.create({
  container: {
    marginBottom: GLOBAL_CONSTANTS.LG_MARGIN
  }
});

export default SummaryTabs;
