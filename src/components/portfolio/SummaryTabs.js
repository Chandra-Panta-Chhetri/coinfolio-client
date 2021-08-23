import React from "react";
import { View } from "react-native";
import Tabs from "../shared/Tabs";
import HistoricValue from "./HistoricValue";
import Allocations from "./allocations/Allocations";
import { Entypo } from "@expo/vector-icons";
import CONSTANTS from "../../Constants";
import GlobalStyles from "../../GlobalStyles";

const SummaryTabs = () => {
  return (
    <View style={GlobalStyles.componentContainer}>
      <Tabs
        tabHeadingMarginBottom={
          CONSTANTS.PORTFOLIO.SUMMARY_TAB_HEADING_MARGIN_BOTTOM
        }
      >
        <HistoricValue
          tabLabel="Historic Value"
          iconComponent={
            <Entypo
              name="line-graph"
              size={CONSTANTS.SHARED.TAB_HEADING_ICON_SIZE}
            />
          }
        />
        <Allocations
          tabLabel="Allocations"
          iconComponent={
            <Entypo
              name="pie-chart"
              size={CONSTANTS.SHARED.TAB_HEADING_ICON_SIZE}
            />
          }
        />
      </Tabs>
    </View>
  );
};

export default SummaryTabs;
