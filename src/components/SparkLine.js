import React, { useState, useRef } from "react";
import Skeleton from "../components/Skeleton";
import { View } from "react-native";
import { GLOBAL_STYLES } from "../styles";
import Svg, { Path } from "react-native-svg";
import { COLORS } from "../constants";
import RAINBOW_CHART_DEFAULTS from "./RainbowChart/defaults";
import { buildSparkLine, isNullOrUndefined } from "../utils";

const SparkLine = ({
  dataPoints = RAINBOW_CHART_DEFAULTS.DATA_POINTS,
  chartStyle = GLOBAL_STYLES.fullContainer,
  svgConfig = RAINBOW_CHART_DEFAULTS.SVG_LINE_CONFIG,
  isPositive = false,
  xValueAccessor = RAINBOW_CHART_DEFAULTS.ACCESSOR_FUNC,
  yValueAccessor = RAINBOW_CHART_DEFAULTS.ACCESSOR_FUNC,
  dataPointsAccessor = RAINBOW_CHART_DEFAULTS.ACCESSOR_FUNC
}) => {
  const [chartDimensions, setChartDimensions] = useState({
    width: 0,
    height: 0,
    hasBeenCalculated: false
  });
  const { width, height, hasBeenCalculated } = chartDimensions;
  const path = useRef(null);

  const onLayout = (event) => {
    if (!hasBeenCalculated) {
      const chartHeight = event?.nativeEvent?.layout?.height;
      const chartWidth = event?.nativeEvent?.layout?.width;
      const valueAccessors = {
        xValueAccessor,
        yValueAccessor,
        dataPointsAccessor
      };
      path.current = buildSparkLine(dataPoints, chartWidth, chartHeight, valueAccessors);
      setChartDimensions({ height: chartHeight, width: chartWidth, hasBeenCalculated: true });
    }
  };

  if (!hasBeenCalculated || isNullOrUndefined(path?.current)) {
    return (
      <View onLayout={onLayout} style={chartStyle}>
        <Skeleton style={GLOBAL_STYLES.fullContainer} />
      </View>
    );
  }

  return (
    <View style={chartStyle}>
      <Svg style={{ width, height }}>
        <Path d={path?.current} {...svgConfig} stroke={!isPositive ? COLORS.ERROR : COLORS.SUCCESS} />
      </Svg>
    </View>
  );
};

export default SparkLine;
