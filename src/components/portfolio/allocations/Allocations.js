import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import PieChart from "../../shared/PieChart";
import CONSTANTS from "../../../Constants";
import { connect } from "react-redux";
import { selectPortfolioAssets } from "../../../redux/portfolio/portfolio.selectors";
import { roundPercent } from "../../../GlobalUtils";
import GlobalStyles from "../../../GlobalStyles";
import Labels from "./AllocationLabels";

const Allocations = ({ assets }) => {
  const [data, setData] = useState([]);
  const [selectedSlice, setSelectedSlice] = useState(null);
  const colors = ["#21e6c1", "#278ea5", "#1f4287", "#071e3d", "#28c7fa"];

  useEffect(() => {
    const totalPortfolioVal = assets.reduce(
      (acc, asset) => acc + asset.holdingsVal,
      0
    );
    const allocations = assets;
    allocations.sort((a1, a2) => a1.holdingsVal - a2.holdingsVal);
    const formattedAllocations = allocations
      .slice(0, CONSTANTS.ALLOCATIONS.MAX_NUM_TO_SHOW)
      .map((allocation, i) => ({
        key: `${allocation.ticker}`,
        value: roundPercent((allocation.holdingsVal / totalPortfolioVal) * 100),
        svg: {
          fill: colors[i],
          onPress: () => changeSelectedSlice(i)
        }
      }));
    setData(formattedAllocations);
  }, [assets]);

  const changeSelectedSlice = (index, allowToggle = true) => {
    if (selectedSlice !== index) {
      return setSelectedSlice(index);
    }

    if (allowToggle) {
      setSelectedSlice(null);
    }
  };

  useEffect(() => {
    console.log("rendering pie chart");
  }, []);

  return (
    <Card style={GlobalStyles.borderRadius}>
      <Card.Content>
        <PieChart
          pieChartStyle={styles.pieChart}
          data={data}
          padAngle={0.05}
          innerRadius="75%"
          selectedSlice={selectedSlice}
          innerLabelConfig={CONSTANTS.PIE_CHART.INNER_LABEL_CONFIG}
        />
        <Labels
          data={data}
          selectedSlice={selectedSlice}
          changeSelectedSlice={changeSelectedSlice}
        />
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  pieChart: {
    height: 190,
    width: "100%"
  }
});

const mapStateToProps = (state) => ({
  assets: selectPortfolioAssets(state)
});

export default connect(mapStateToProps)(Allocations);
