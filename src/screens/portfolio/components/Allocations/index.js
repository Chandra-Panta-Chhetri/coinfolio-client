import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { Card, useTheme } from "react-native-paper";
import { connect } from "react-redux";
import { selectPortfolioPieCharts } from "../../../../redux/portfolio";
import { formatNum, isNullOrUndefined } from "../../../../utils";
import Labels from "./Labels";
import { GLOBAL_CONSTANTS } from "../../../../constants";
import { PieChart } from "../../../../components";

const SLICE_COLORS = ["#ced6e5", "#7b75b8", "#5bb28a", "#d41923", "#30a5be"];

const Allocations = ({ pieCharts }) => {
  const { colors } = useTheme();
  const [dataPoints, setDataPoints] = useState([]);
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
    if (!isNullOrUndefined(pieCharts) && pieCharts?.length > 0) {
      const formattedAllocations = pieCharts?.map((pc, i) => ({
        key: `${pc?.coinSymbol}`,
        value: formatNum(+pc?.percent * 100),
        svg: {
          fill: SLICE_COLORS[i]
        }
      }));
      setDataPoints(formattedAllocations);
    }
  }, [pieCharts]);

  return (
    <Card style={STYLES.cardContainer}>
      <Card.Content>
        <PieChart
          style={STYLES.pieChart}
          dataPoints={dataPoints}
          innerRadius="75%"
          selectedSlice={selectedSlice}
          changeSelectedSlice={changeSelectedSlice}
          innerLabelStyle={{ fill: colors?.text }}
        />
        <Labels dataPoints={dataPoints} selectedSlice={selectedSlice} changeSelectedSlice={changeSelectedSlice} />
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
    borderRadius: GLOBAL_CONSTANTS.BORDER_RADIUS,
    marginBottom: GLOBAL_CONSTANTS.MD_MARGIN
  }
});

const mapStateToProps = (state) => ({
  pieCharts: selectPortfolioPieCharts(state)
});

export default connect(mapStateToProps)(Allocations);
