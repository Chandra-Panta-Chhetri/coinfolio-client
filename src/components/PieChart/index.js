import React, { useState } from "react";
import { View, Platform, StyleSheet } from "react-native";
import * as shape from "d3-shape";
import Svg, { G, Path, Text } from "react-native-svg";
import Skeleton from "../Skeleton";
import { GLOBAL_STYLES, TYPOGRAPHY } from "../../styles";
import PIE_CHART_DEFAULTS from "./defaults";
import { calculateRadius } from "./utils";
import { useMemo } from "react";
import { useEffect } from "react";
import { DEVICE_TYPES } from "../../constants";
import { isNullOrUndefined } from "../../utils";

const PieChart = ({
  dataPoints = PIE_CHART_DEFAULTS.DATA_POINTS,
  innerRadius = PIE_CHART_DEFAULTS.INNER_RADIUS,
  outerRadius = PIE_CHART_DEFAULTS.OUTER_RADIUS,
  padAngle = PIE_CHART_DEFAULTS.PAD_ANGLE,
  style,
  sort = PIE_CHART_DEFAULTS.SORT,
  valueAccessor = PIE_CHART_DEFAULTS.VALUE_ACCESSOR,
  startAngle = PIE_CHART_DEFAULTS.START_ANGLE,
  endAngle = PIE_CHART_DEFAULTS.END_ANGLE,
  selectedSlice,
  innerLabelValueAccessor = PIE_CHART_DEFAULTS.INNER_LABEL_VALUE_ACCESSOR,
  changeSelectedSlice,
  innerLabelStyle,
  isLoading
}) => {
  const [containerDimensions, setContainerDimensions] = useState({
    height: 0,
    width: 0,
    hasBeenCalculated: false
  });
  const { height, width, hasBeenCalculated } = containerDimensions;

  useEffect(() => {
    setContainerDimensions({ height: 0, width: 0, hasBeenCalculated: false });
  }, [style]);

  const onLayout = (event) => {
    if (!hasBeenCalculated) {
      const height = event?.nativeEvent?.layout?.height ?? 0;
      const width = event?.nativeEvent?.layout?.width ?? 0;
      setContainerDimensions({ height, width, hasBeenCalculated: true });
    }
  };

  const maxRadius =
    Math.min(width, height) / 2 - (PIE_CHART_DEFAULTS.SELECTED_ELEVATION + PIE_CHART_DEFAULTS.MAX_RADIUS_OFFSET);

  const calculatedOuterRadius = calculateRadius(outerRadius, maxRadius, maxRadius);
  const calculatedInnerRadius = calculateRadius(innerRadius, maxRadius, 0);

  if (outerRadius > 0 && calculatedInnerRadius >= outerRadius) {
    return null;
  }

  const arcGenerator = useMemo(
    () => shape.arc().outerRadius(calculatedOuterRadius).innerRadius(calculatedInnerRadius).padAngle(padAngle),
    [calculatedOuterRadius, calculatedInnerRadius, padAngle]
  );

  const selectedArcGenerator = useMemo(
    () =>
      shape
        .arc()
        .outerRadius(calculatedOuterRadius + PIE_CHART_DEFAULTS.SELECTED_ELEVATION)
        .innerRadius(calculatedInnerRadius)
        .padAngle(padAngle),
    [calculatedOuterRadius, calculatedInnerRadius, padAngle]
  );

  const slices = useMemo(
    () =>
      shape
        .pie()
        .value((d) => valueAccessor({ item: d }))
        .sort(sort)
        .startAngle(startAngle)
        .endAngle(endAngle)(dataPoints),
    [valueAccessor, sort, startAngle, endAngle, dataPoints]
  );

  if (!hasBeenCalculated || isLoading) {
    return (
      <View onLayout={onLayout} style={style}>
        <Skeleton style={GLOBAL_STYLES.fullContainer} />
      </View>
    );
  }

  return (
    <View pointerEvents={"box-none"} style={style}>
      <Svg pointerEvents={Platform.OS === DEVICE_TYPES.ANDROID ? "box-none" : undefined} style={{ width, height }}>
        <G x={width / 2} y={height / 2}>
          {slices?.map((slice, i) => {
            const { key, svg } = dataPoints[i];
            return (
              <Path
                key={key}
                {...svg}
                onPress={() => {
                  if (!isNullOrUndefined(changeSelectedSlice)) {
                    changeSelectedSlice(i);
                  }
                }}
                d={i === selectedSlice ? selectedArcGenerator(slice) : arcGenerator(slice)}
              />
            );
          })}
          {!isNullOrUndefined(selectedSlice) ? (
            <Text {...STYLES.innerLabel} {...innerLabelStyle}>
              {innerLabelValueAccessor(dataPoints[selectedSlice])}
            </Text>
          ) : null}
        </G>
      </Svg>
    </View>
  );
};

const STYLES = StyleSheet.create({
  innerLabel: {
    ...TYPOGRAPHY.subheading,
    ...PIE_CHART_DEFAULTS.INNER_LABEL_CONFIG
  }
});

export default PieChart;
