import React, { useState } from "react";
import { View, Platform, StyleSheet } from "react-native";
import * as shape from "d3-shape";
import Svg, { G, Path, Text } from "react-native-svg";
import Skeleton from "./Skeleton";
import CONSTANTS from "../../Constants";

const defaultSortFunc = (a, b) => b.value - a.value;
const defaultValueAccessorFunc = ({ item }) => item.value;
const defaultGetInnerLabelText = () => "";

const calculateRadius = (radiusFromProp, maxRadius, defaultRadius) => {
  if (typeof radiusFromProp === "string") {
    return (radiusFromProp.split("%")[0] / 100) * maxRadius;
  } else if (radiusFromProp) {
    return radiusFromProp;
  }
  return defaultRadius;
};

const PieChart = ({
  data,
  innerRadius,
  outerRadius,
  // labelRadius,
  padAngle = CONSTANTS.PIE_CHART_PAD_ANGLE,
  pieChartStyle,
  sortFunc = defaultSortFunc,
  valueAccessorFunc = defaultValueAccessorFunc,
  // children,
  startAngle = CONSTANTS.PIE_CHART_START_ANGLE,
  endAngle = CONSTANTS.PIE_CHART_END_ANGLE,
  selectedElevation = CONSTANTS.PIE_CHART_SELECTED_ELEVATION,
  selectedSlice = null,
  innerLabelConfig,
  getInnerLabelText = defaultGetInnerLabelText
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
    Math.min(width, height) / 2 -
    (selectedElevation + CONSTANTS.PIE_CHART_MAX_RADIUS_OFFSET);

  const _outerRadius = calculateRadius(outerRadius, maxRadius, maxRadius);
  const _innerRadius = calculateRadius(innerRadius, maxRadius, 0);
  // const _labelRadius = calculateRadius(labelRadius, maxRadius, _outerRadius);

  if ((outerRadius > 0 && _innerRadius >= outerRadius) || data.length === 0) {
    return null;
  }

  const arcGenerator = shape
    .arc()
    .outerRadius(_outerRadius)
    .innerRadius(_innerRadius)
    .padAngle(padAngle);

  const selectedArcGenerator = shape
    .arc()
    .outerRadius(_outerRadius + selectedElevation)
    .innerRadius(_innerRadius)
    .padAngle(padAngle);

  // const labelArcGenerator = labelRadius
  //   ? shape
  //       .arc()
  //       .outerRadius(_labelRadius)
  //       .innerRadius(_labelRadius)
  //       .padAngle(padAngle)
  //   : arcGenerator;

  const pieSlices = shape
    .pie()
    .value((d) => valueAccessorFunc({ item: d }))
    .sort(sortFunc)
    .startAngle(startAngle)
    .endAngle(endAngle)(data);

  // const slices = pieSlices.map((slice) => ({
  //   ...slice,
  //   pieCentroid: arcGenerator.centroid(slice),
  //   labelCentroid: labelArcGenerator.centroid(slice)
  // }));

  // const childProps = {
  //   pieChartContainerDimensions: { width, height },
  //   data,
  //   slices,
  //   selectedSlice
  // };

  // const modifiedChildElements = React.Children.map(children, (child) =>
  //   React.cloneElement(child, childProps)
  // );

  if (width === 0 && height === 0) {
    return (
      <View onLayout={onLayout} style={pieChartStyle}>
        <Skeleton style={styles.fullContainerSpace} />
      </View>
    );
  }

  return (
    <View pointerEvents={"box-none"} style={pieChartStyle}>
      {height > 0 && width > 0 && (
        <>
          <Svg
            pointerEvents={Platform.OS === "android" && "box-none"}
            style={{ width, height }}
          >
            <G x={width / 2} y={height / 2}>
              {pieSlices.map((slice, index) => {
                const { key, onPress, svg } = data[index];
                return (
                  <Path
                    key={key}
                    onPress={onPress}
                    {...svg}
                    d={
                      index === selectedSlice
                        ? selectedArcGenerator(slice)
                        : arcGenerator(slice)
                    }
                  />
                );
              })}
              <Text {...innerLabelConfig}>
                {selectedSlice !== null
                  ? getInnerLabelText(data[selectedSlice])
                  : ""}
              </Text>
            </G>
          </Svg>
          {/* {modifiedChildElements} */}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  fullContainerSpace: {
    width: "100%",
    height: "100%"
  }
});

export default PieChart;
