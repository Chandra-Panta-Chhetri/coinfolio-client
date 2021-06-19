import React, { useState, useEffect } from "react";
import { View, Platform } from "react-native";
import * as shape from "d3-shape";
import Svg, { G, Path, Text } from "react-native-svg";
// import Reanimated, {
//   withTiming,
//   useSharedValue,
//   useAnimatedProps,
//   Easing,
//   useDerivedValue,
//   runOnJS,
//   interpolate
// } from "react-native-reanimated";

const defaultSortFunc = (a, b) => b.value - a.value;
const defaultValueAccessorFunc = ({ item }) => item.value;

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
  labelRadius,
  padAngle = 0,
  style,
  sortFunc = defaultSortFunc,
  valueAccessorFunc = defaultValueAccessorFunc,
  children,
  startAngle = 0,
  endAngle = Math.PI * 2,
  selectedElevation = 5,
  selectedSlice = null,
  innerLabelConfig = {}
}) => {
  const [containerDimensions, setContainerDimensions] = useState({
    height: 0,
    width: 0
  });

  const onLayout = (event) => {
    const height = event.nativeEvent.layout.height;
    const width = event.nativeEvent.layout.width;
    setContainerDimensions({ height, width });
  };

  const { height, width } = containerDimensions;
  const maxRadius = Math.min(width, height) / 2 - selectedElevation;

  const _outerRadius = calculateRadius(outerRadius, maxRadius, maxRadius);
  const _innerRadius = calculateRadius(innerRadius, maxRadius, 0);
  const _labelRadius = calculateRadius(labelRadius, maxRadius, _outerRadius);

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

  const labelArcGenerator = labelRadius
    ? shape
        .arc()
        .outerRadius(_labelRadius)
        .innerRadius(_labelRadius)
        .padAngle(padAngle)
    : arcGenerator;

  const pieSlices = shape
    .pie()
    .value((d) => valueAccessorFunc({ item: d }))
    .sort(sortFunc)
    .startAngle(startAngle)
    .endAngle(endAngle)(data);

  const slices = pieSlices.map((slice) => ({
    ...slice,
    pieCentroid: arcGenerator.centroid(slice),
    labelCentroid: labelArcGenerator.centroid(slice)
  }));

  const childProps = {
    pieChartContainerDimensions: { width, height },
    data,
    slices,
    selectedSlice
  };

  const modifiedChildElements = React.Children.map(children, (child) =>
    React.cloneElement(child, childProps)
  );

  return (
    <View pointerEvents={"box-none"} style={style}>
      <View
        pointerEvents={"box-none"}
        style={{
          flex: 1,
          position: "relative"
        }}
        onLayout={onLayout}
      >
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
                    ? `${data[selectedSlice].key} - ${data[selectedSlice].value}%`
                    : ""}
                </Text>
              </G>
            </Svg>
            {/* {modifiedChildElements} */}
          </>
        )}
      </View>
    </View>
  );
};

export default PieChart;
