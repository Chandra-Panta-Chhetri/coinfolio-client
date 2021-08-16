import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Card, Paragraph } from "react-native-paper";
import PieChart from "../PieChart";
import TouchableNativeOpacity from "../TouchableNativeOpacity";
import CONSTANTS from "../../Constants";
import { connect } from "react-redux";
import { selectPortfolioAssets } from "../../redux/portfolio/portfolio.selectors";

const roundPercent = (num) => Math.round((num + Number.EPSILON) * 100) / 100;

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
      style={styles.scrollViewContainer}
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

const Allocations = ({ assets }) => {
  const [data, setData] = useState([]);
  const [selectedSlice, setSelectedSlice] = useState(null);

  useEffect(() => {
    const totalPortfolioVal = assets.reduce(
      (acc, asset) => acc + asset.holdingsVal,
      0
    );
    const allocations = assets;
    allocations.sort((a1, a2) => a1.holdingsVal - a2.holdingsVal);
    const formattedAllocations = allocations
      .slice(0, CONSTANTS.PIE_CHART_MAX_NUM_ALLOCATIONS_TO_SHOW)
      .map((allocation) => ({
        ticker: allocation.ticker,
        percent: roundPercent(
          (allocation.holdingsVal / totalPortfolioVal) * 100
        )
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

  const colors = ["#21e6c1", "#278ea5", "#1f4287", "#071e3d", "#28c7fa"];

  const pieData = data.map((value, index) => ({
    value: value.percent,
    svg: {
      fill: colors[index],
      onPress: () => changeSelectedSlice(index)
    },
    key: `${value.ticker}`
  }));

  useEffect(() => {
    console.log("rendering pie chart");
  }, []);

  return (
    <Card style={styles.cardContainer}>
      <Card.Content>
        <PieChart
          pieChartStyle={styles.pieChart}
          data={pieData}
          padAngle={0.05}
          innerRadius="75%"
          selectedSlice={selectedSlice}
          innerLabelConfig={CONSTANTS.PIE_CHART_INNER_LABEL_CONFIG}
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
    borderRadius: 13
  },
  pieChart: {
    height: 190,
    width: "100%"
  },
  pieChartLabels: {
    marginTop: 10,
    flexGrow: 1
  },
  scrollViewContainer: {
    marginVertical: 6
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

const mapStateToProps = (state) => ({
  assets: selectPortfolioAssets(state)
});

export default connect(mapStateToProps)(Allocations);
