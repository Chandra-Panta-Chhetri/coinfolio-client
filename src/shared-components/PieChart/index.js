import React, { useState } from "react";
import { View, Platform } from "react-native";
import * as shape from "d3-shape";
import Svg, { G, Path, Text } from "react-native-svg";
import Skeleton from "../Skeleton";
import { GLOBAL_STYLES, TYPOGRAPHY } from "../../styles";
import PIE_CHART_CONSTANTS from "./constants";

const calculateRadius = (radiusFromProp, maxRadius, defaultRadius) => {
  if (typeof radiusFromProp === "string") {
    return (radiusFromProp.split("%")[0] / 100) * maxRadius;
  } else if (radiusFromProp) {
    return radiusFromProp;
  }
  return defaultRadius;
};

const PieChart = ({
  data = [],
  innerRadius = 0,
  outerRadius = 0,
  padAngle = PIE_CHART_CONSTANTS.DEFAULT_PAD_ANGLE,
  pieChartStyle = {},
  sortFunc = PIE_CHART_CONSTANTS.DEFAULT_SORT_FUNCTION,
  valueAccessorFunc = PIE_CHART_CONSTANTS.DEFAULT_VALUE_ACCESSOR_FUNCTION,
  startAngle = PIE_CHART_CONSTANTS.DEFAULT_START_ANGLE,
  endAngle = PIE_CHART_CONSTANTS.DEFAULT_END_ANGLE,
  selectedSlice = null,
  getInnerLabelText = PIE_CHART_CONSTANTS.DEFAULT_INNER_LABEL_VALUE_ACCESSOR_FUNCTION,
  changeSelectedSlice,
  innerLabelStyle = {}
}) => {
  const [containerDimensions, setContainerDimensions] = useState({
    height: 0,
    width: 0,
    hasBeenCalculated: false
  });
  const { height, width, hasBeenCalculated } = containerDimensions;

  const onLayout = (event) => {
    if (hasBeenCalculated) return;
    const height = event.nativeEvent.layout.height;
    const width = event.nativeEvent.layout.width;
    setContainerDimensions({ height, width, hasBeenCalculated: true });
  };

  const maxRadius =
    Math.min(width, height) / 2 - (PIE_CHART_CONSTANTS.SELECTED_ELEVATION + PIE_CHART_CONSTANTS.MAX_RADIUS_OFFSET);

  const _outerRadius = calculateRadius(outerRadius, maxRadius, maxRadius);
  const _innerRadius = calculateRadius(innerRadius, maxRadius, 0);

  if ((outerRadius > 0 && _innerRadius >= outerRadius) || data.length === 0) {
    return null;
  }

  const arcGenerator = shape.arc().outerRadius(_outerRadius).innerRadius(_innerRadius).padAngle(padAngle);

  const selectedArcGenerator = shape
    .arc()
    .outerRadius(_outerRadius + PIE_CHART_CONSTANTS.SELECTED_ELEVATION)
    .innerRadius(_innerRadius)
    .padAngle(padAngle);

  const pieSlices = shape
    .pie()
    .value((d) => valueAccessorFunc({ item: d }))
    .sort(sortFunc)
    .startAngle(startAngle)
    .endAngle(endAngle)(data);

  if (width === 0 && height === 0) {
    return (
      <View onLayout={onLayout} style={pieChartStyle}>
        <Skeleton style={GLOBAL_STYLES.fullContainerDimension} />
      </View>
    );
  }

  return (
    <View pointerEvents={"box-none"} style={pieChartStyle}>
      {height > 0 && width > 0 && (
        <>
          <Svg pointerEvents={Platform.OS === "android" && "box-none"} style={{ width, height }}>
            <G x={width / 2} y={height / 2}>
              {pieSlices.map((slice, i) => {
                const { key, svg } = data[i];
                return (
                  <Path
                    key={key}
                    {...svg}
                    onPress={() => changeSelectedSlice && changeSelectedSlice(i)}
                    d={i === selectedSlice ? selectedArcGenerator(slice) : arcGenerator(slice)}
                  />
                );
              })}
              <Text
                {...{
                  ...innerLabelStyle,
                  ...PIE_CHART_CONSTANTS.INNER_LABEL_CONFIG
                }}
                {...TYPOGRAPHY.subheading}
              >
                {selectedSlice !== null && getInnerLabelText(data[selectedSlice])}
              </Text>
            </G>
          </Svg>
        </>
      )}
    </View>
  );
};

export default PieChart;
