import React, { useState, useRef } from "react";
import { Skeleton } from "../shared-components";
import { View } from "react-native";
import { GLOBAL_STYLES } from "../styles";
import Svg, { Path } from "react-native-svg";
import { COLORS } from "../constants";

import { buildLineChart } from "./RainbowChart/chart-utils";
import { serialize } from "react-native-redash";

const xValueAccessor = (dataInstance) => dataInstance[1];
const yValueAccessor = (dataInstance) => dataInstance[0];
const percentChangeAccessor = (data) => data.percent_change;
const dataPointsAccessor = (data) => data.prices;

const SparkLine = ({
  data = {},
  chartStyle = { width: "100%", height: "100%" },
  svgConfig = {},
  isPositive = false
}) => {
  const [chartDimensions, setChartDimensions] = useState({
    width: 0,
    height: 0,
    hasBeenCalculated: false
  });
  const { width, height, hasBeenCalculated } = chartDimensions;
  const lineChart = useRef(null);

  const onLayout = (event) => {
    if (hasBeenCalculated) return;
    const chartHeight = event.nativeEvent.layout.height;
    const chartWidth = event.nativeEvent.layout.width;
    const valueAccessors = {
      xValueAccessor,
      yValueAccessor,
      percentChangeAccessor,
      dataPointsAccessor
    };
    lineChart.current = buildLineChart(data, chartWidth, chartHeight, valueAccessors, 30);
    setChartDimensions({ height: chartHeight, width: chartWidth, hasBeenCalculated: true });
  };

  if ((width === 0 && height === 0) || !lineChart.current) {
    return (
      <View onLayout={onLayout} style={chartStyle}>
        <Skeleton style={GLOBAL_STYLES.fullContainerDimension} />
      </View>
    );
  }

  return (
    <View style={chartStyle}>
      <Svg style={{ width, height }}>
        <Path
          d={serialize(lineChart.current.path)}
          {...svgConfig}
          stroke={!isPositive ? COLORS.ERROR : COLORS.SUCCESS}
        />
      </Svg>
    </View>
  );
};

export default SparkLine;
