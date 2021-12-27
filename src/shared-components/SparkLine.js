import React, { useState, useRef } from "react";
import Skeleton from "../shared-components/Skeleton";
import { View } from "react-native";
import { GLOBAL_STYLES } from "../styles";
import Svg, { Path } from "react-native-svg";
import { COLORS } from "../constants";
import LINE_CHART_CONSTANTS from "./RainbowChart/constants";
import { buildSparkLine } from "../utils";

const sparkLinePath = ({
  data = {},
  chartStyle = GLOBAL_STYLES.fullContainerDimension,
  svgConfig = LINE_CHART_CONSTANTS.SVG_LINE_CONFIG,
  isPositive = false,
  xValueAccessor = LINE_CHART_CONSTANTS.DEFAULT_ACCESSOR_FUNC,
  yValueAccessor = LINE_CHART_CONSTANTS.DEFAULT_ACCESSOR_FUNC,
  dataPointsAccessor = LINE_CHART_CONSTANTS.DEFAULT_ACCESSOR_FUNC
}) => {
  const [chartDimensions, setChartDimensions] = useState({
    width: 0,
    height: 0,
    hasBeenCalculated: false
  });
  const { width, height, hasBeenCalculated } = chartDimensions;
  const sparkLinePath = useRef(null);

  const onLayout = (event) => {
    if (hasBeenCalculated) return;
    const chartHeight = event.nativeEvent.layout.height;
    const chartWidth = event.nativeEvent.layout.width;
    const valueAccessors = {
      xValueAccessor,
      yValueAccessor,
      dataPointsAccessor
    };
    sparkLinePath.current = buildSparkLine(data, chartWidth, chartHeight, valueAccessors);
    setChartDimensions({ height: chartHeight, width: chartWidth, hasBeenCalculated: true });
  };

  if ((width === 0 && height === 0) || !sparkLinePath.current) {
    return (
      <View onLayout={onLayout} style={chartStyle}>
        <Skeleton style={GLOBAL_STYLES.fullContainerDimension} />
      </View>
    );
  }

  return (
    <View style={chartStyle}>
      <Svg style={{ width, height }}>
        <Path d={sparkLinePath.current} {...svgConfig} stroke={!isPositive ? COLORS.ERROR : COLORS.SUCCESS} />
      </Svg>
    </View>
  );
};

export default sparkLinePath;
