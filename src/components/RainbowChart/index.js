import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";
import Reanimated, {
  useAnimatedStyle,
  useAnimatedProps,
  useSharedValue,
  withTiming,
  useDerivedValue
} from "react-native-reanimated";
import { mixPath } from "react-native-redash";
import Cursor from "./Cursor";
import Header from "./Header";
import Skeleton from "../Skeleton";
import PressableView from "../PressableView";
import Label from "./Label";
import RAINBOW_CHART_DEFAULTS from "./defaults";
import { GLOBAL_STYLES, TYPOGRAPHY } from "../../styles";
import { Text, useTheme } from "react-native-paper";
import { GLOBAL_CONSTANTS } from "../../constants";
import { calculateRainbowChart } from "../../utils";

const AnimatedPath = Reanimated.createAnimatedComponent(Path);

const LineChart = ({
  dataPoints = RAINBOW_CHART_DEFAULTS.DATA_POINTS,
  style,
  initialSelectedGraph = RAINBOW_CHART_DEFAULTS.SELECTED_GRAPH,
  svgConfig = RAINBOW_CHART_DEFAULTS.SVG_LINE_CONFIG,
  xValueAccessor = RAINBOW_CHART_DEFAULTS.ACCESSOR_FUNC,
  yValueAccessor = RAINBOW_CHART_DEFAULTS.ACCESSOR_FUNC,
  percentChangeAccessor = RAINBOW_CHART_DEFAULTS.ACCESSOR_FUNC,
  dataPointsAccessor = RAINBOW_CHART_DEFAULTS.ACCESSOR_FUNC
}) => {
  const { colors: themeColors, dark: isDarkMode } = useTheme();
  const [chartDimensions, setChartDimensions] = useState({
    width: 0,
    height: 0,
    hasBeenCalculated: false
  });
  const [chartData, setChartData] = useState([]);
  const { width, hasBeenCalculated, height } = chartDimensions;

  const onLayout = (event) => {
    if (!hasBeenCalculated) {
      const chartHeight = event?.nativeEvent?.layout?.height;
      const chartWidth = event?.nativeEvent?.layout?.width;
      setChartDimensions({
        height: chartHeight,
        width: chartWidth,
        hasBeenCalculated: true
      });
    }
  };

  useEffect(() => {
    if (chartDimensions?.hasBeenCalculated && dataPoints?.length > 0) {
      const valueAccessors = {
        xValueAccessor,
        yValueAccessor,
        percentChangeAccessor,
        dataPointsAccessor
      };
      const chartData = calculateRainbowChart(dataPoints, width, height, valueAccessors);
      setChartData(chartData);
    }
  }, [dataPoints, chartDimensions]);

  const labelWidth = chartData?.length === 0 ? 0 : width / chartData?.length;

  const pathTransistion = useSharedValue(0);
  const previousSelected = useSharedValue(initialSelectedGraph);
  const currentSelected = useSharedValue(initialSelectedGraph);
  const yPanGesturePos = useSharedValue(0);
  const xPanGesturePos = useSharedValue(0);
  const isPanGestureActive = useSharedValue(false);

  const hasPathsBeenCalculated = useDerivedValue(() => {
    return (
      chartData[currentSelected?.value] &&
      chartData[currentSelected?.value]?.dataPoints &&
      chartData[currentSelected?.value]?.dataPoints?.path
    );
  }, [chartData]);

  const selectedGraph = useDerivedValue(() =>
    hasPathsBeenCalculated?.value ? chartData[currentSelected?.value]?.dataPoints : {}
  );

  const animatedLabelOverlay = useAnimatedStyle(
    () => ({
      transform: [{ translateX: withTiming(labelWidth * currentSelected?.value) }]
    }),
    [labelWidth]
  );

  const animatedLabel = useAnimatedStyle(() => ({
    opacity: withTiming(!hasPathsBeenCalculated?.value ? 0 : 1)
  }));

  const animatedPathProps = useAnimatedProps(() => {
    const previousPath = hasPathsBeenCalculated?.value ? chartData[previousSelected?.value]?.dataPoints?.path : "";
    const currentPath = hasPathsBeenCalculated?.value ? chartData[currentSelected?.value]?.dataPoints?.path : "";

    return {
      d: !previousPath ? "" : mixPath(pathTransistion.value, previousPath, currentPath),
      strokeWidth: withTiming(isPanGestureActive?.value ? svgConfig.strokeWidth + 1 : svgConfig.strokeWidth)
    };
  }, [chartData]);

  const handleLabelPress = (index) => {
    if (currentSelected?.value !== index) {
      pathTransistion.value = 0;
      previousSelected.value = currentSelected?.value;
      currentSelected.value = index;
      pathTransistion.value = withTiming(1);
    }
  };

  if (!hasBeenCalculated) {
    return (
      <View onLayout={onLayout} style={style}>
        <Skeleton style={GLOBAL_STYLES.fullContainer} />
      </View>
    );
  }

  return (
    <View style={[STYLES.container, { width: style?.width ?? "100%" }]}>
      <View style={STYLES.headerContainer}>
        <Header
          yPanGesturePos={yPanGesturePos}
          selectedGraph={selectedGraph}
          xPanGesturePos={xPanGesturePos}
          hasPathsBeenCalculated={hasPathsBeenCalculated}
          isPanGestureActive={isPanGestureActive}
          themeColors={themeColors}
        />
      </View>
      <View style={[style, STYLES.relativePosition]}>
        <Svg style={GLOBAL_STYLES.fullContainer}>
          <AnimatedPath animatedProps={animatedPathProps} {...svgConfig} stroke={themeColors?.text} />
        </Svg>
        <Cursor
          maxWidth={width}
          yPanGesturePos={yPanGesturePos}
          isPanGestureActive={isPanGestureActive}
          selectedGraph={selectedGraph}
          xPanGesturePos={xPanGesturePos}
          hasPathsBeenCalculated={hasPathsBeenCalculated}
          themeColors={themeColors}
        />
        {["min", "max"].map((_, i) => (
          <Label
            key={i}
            isPanGestureActive={isPanGestureActive}
            indexOfCoordinates={i}
            selectedGraph={selectedGraph}
            maxWidth={width}
            hasPathsBeenCalculated={hasPathsBeenCalculated}
            themeColors={themeColors}
          />
        ))}
      </View>
      <Reanimated.View
        style={[
          STYLES.labels,
          animatedLabel,
          { backgroundColor: isDarkMode ? themeColors?.surface : themeColors?.border }
        ]}
      >
        <View style={StyleSheet.absoluteFill}>
          <Reanimated.View
            style={[
              STYLES.labelOverlay,
              {
                width: labelWidth,
                backgroundColor: isDarkMode ? themeColors?.border : themeColors?.surface
              },
              animatedLabelOverlay
            ]}
          />
        </View>
        {dataPoints?.map((d, i) => (
          <PressableView key={d?.label} onPress={() => handleLabelPress(i)} viewStyle={{ width: labelWidth }}>
            <Text style={STYLES.label}>{d?.label}</Text>
          </PressableView>
        ))}
      </Reanimated.View>
    </View>
  );
};

const STYLES = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    position: "relative"
  },
  label: {
    ...TYPOGRAPHY.subheading,
    ...TYPOGRAPHY.textAlignCenter
  },
  labels: {
    flexDirection: "row",
    alignSelf: "center",
    width: "100%",
    marginTop: 35,
    position: "relative"
  },
  headerContainer: {
    marginBottom: GLOBAL_CONSTANTS.MD_MARGIN
  },
  relativePosition: {
    position: "relative"
  },
  labelOverlay: {
    ...StyleSheet.absoluteFillObject
  }
});

export default LineChart;
