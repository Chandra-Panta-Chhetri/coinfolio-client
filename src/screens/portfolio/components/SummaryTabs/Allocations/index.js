import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { Card, useTheme } from "react-native-paper";
import { PieChart } from "../../../../../shared-components";
import { connect } from "react-redux";
import { selectPortfolioAssets } from "../../../../../redux/portfolio";
import { roundPercentWorklet } from "../../../../../utils";
import { GLOBAL_STYLES } from "../../../../../styles";
import Labels from "./Labels";
import { GLOBAL_CONSTANTS } from "../../../../../constants";

const MAX_TO_SHOW = 5;
const SLICE_COLORS = ["#ced6e5", "#f8921c", "#627eea", "#f2ba31", "#4c9d7c"];

const Allocations = ({ assets }) => {
  const { colors } = useTheme();
  const [data, setData] = useState([]);
  const [selectedSlice, setSelectedSlice] = useState(null);

  const changeSelectedSlice = (index, allowToggle = true) => {
    if (selectedSlice !== index) {
      return setSelectedSlice(index);
    }

    if (allowToggle) {
      setSelectedSlice(null);
    }
  };

  useEffect(() => {
    const totalPortfolioVal = assets.reduce((acc, asset) => acc + asset.holdingsVal, 0);
    const allocations = assets;
    allocations.sort((a1, a2) => a1.holdingsVal - a2.holdingsVal);
    const formattedAllocations = allocations.slice(0, MAX_TO_SHOW).map((allocation, i) => ({
      key: `${allocation.ticker}`,
      value: roundPercentWorklet((allocation.holdingsVal / totalPortfolioVal) * 100),
      svg: {
        fill: SLICE_COLORS[i]
      }
    }));
    setData(formattedAllocations);
  }, [assets]);

  useEffect(() => {
    console.log("allocations mounted");
  }, []);

  return (
    <Card style={STYLES.cardContainer}>
      <Card.Content>
        <PieChart
          pieChartStyle={STYLES.pieChart}
          data={data}
          padAngle={0.05}
          innerRadius="75%"
          selectedSlice={selectedSlice}
          changeSelectedSlice={changeSelectedSlice}
          innerLabelStyle={{ fill: colors.text }}
        />
        <Labels data={data} selectedSlice={selectedSlice} changeSelectedSlice={changeSelectedSlice} />
      </Card.Content>
    </Card>
  );
};

const STYLES = StyleSheet.create({
  pieChart: {
    height: 180,
    width: "100%"
  },
  cardContainer: {
    borderRadius: GLOBAL_CONSTANTS.BORDER_RADIUS
  }
});

const mapStateToProps = (state) => ({
  assets: selectPortfolioAssets(state)
});

export default connect(mapStateToProps)(Allocations);
