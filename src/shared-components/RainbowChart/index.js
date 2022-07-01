import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";
import { formatData } from "../../utils";
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
import RAINBOW_CHART_CONSTANTS from "./constants";
import { GLOBAL_STYLES, TYPOGRAPHY } from "../../styles";
import { Text, useTheme } from "react-native-paper";
import { COLORS, GLOBAL_CONSTANTS } from "../../constants";

const AnimatedPath = Reanimated.createAnimatedComponent(Path);

const LineChart = ({
  data = [],
  chartStyle = {},
  initialSelectedGraph = 0,
  svgConfig = RAINBOW_CHART_CONSTANTS.SVG_LINE_CONFIG,
  xValueAccessor = RAINBOW_CHART_CONSTANTS.DEFAULT_ACCESSOR_FUNC,
  yValueAccessor = RAINBOW_CHART_CONSTANTS.DEFAULT_ACCESSOR_FUNC,
  percentChangeAccessor = RAINBOW_CHART_CONSTANTS.DEFAULT_ACCESSOR_FUNC,
  dataPointsAccessor = RAINBOW_CHART_CONSTANTS.DEFAULT_ACCESSOR_FUNC
}) => {
  const { colors: themeColors, dark: isDarkMode } = useTheme();
  const [chartDimensions, setChartDimensions] = useState({
    width: 0,
    height: 0,
    hasBeenCalculated: false
  });
  const [modifiedData, setModifiedData] = useState(data);
  const { width, hasBeenCalculated, height } = chartDimensions;

  const onLayout = (event) => {
    if (hasBeenCalculated) return;
    const chartHeight = event.nativeEvent.layout.height;
    const chartWidth = event.nativeEvent.layout.width;
    setChartDimensions({
      height: chartHeight,
      width: chartWidth,
      hasBeenCalculated: true
    });
  };

  useEffect(() => {
    if (hasBeenCalculated && data.length > 0) {
      const valueAccessors = {
        xValueAccessor,
        yValueAccessor,
        percentChangeAccessor,
        dataPointsAccessor
      };
      const formattedData = formatData(data, width, height, valueAccessors);
      setModifiedData(formattedData);
    }
  }, [data, hasBeenCalculated]);

  const buttonWidth = (modifiedData.length && width / modifiedData.length) || 0;

  const pathTransistion = useSharedValue(0);
  const previousSelected = useSharedValue(initialSelectedGraph);
  const currentSelected = useSharedValue(initialSelectedGraph);
  const yPanGesturePos = useSharedValue(0);
  const xPanGesturePos = useSharedValue(0);
  const isPanGestureActive = useSharedValue(false);

  const hasPathsBeenCalculated = useDerivedValue(
    () => modifiedData.length > 0 && modifiedData[currentSelected.value].data.path !== undefined,
    [modifiedData]
  );

  const selectedGraph = useDerivedValue(() =>
    hasPathsBeenCalculated.value ? modifiedData[currentSelected.value].data : {}
  );

  const animatedLabelOverlay = useAnimatedStyle(
    () => ({
      transform: [{ translateX: withTiming(buttonWidth * currentSelected.value) }]
    }),
    [buttonWidth]
  );

  const animatedTimeFilters = useAnimatedStyle(() => ({
    opacity: withTiming(!hasPathsBeenCalculated.value ? 0 : 1)
  }));

  const animatedPathProps = useAnimatedProps(() => {
    const previousPath = hasPathsBeenCalculated.value ? modifiedData[previousSelected.value].data.path : "";
    const currentPath = hasPathsBeenCalculated.value ? modifiedData[currentSelected.value].data.path : "";

    return {
      d: !previousPath ? "" : mixPath(pathTransistion.value, previousPath, currentPath),
      strokeWidth: withTiming(isPanGestureActive.value ? svgConfig.strokeWidth + 1 : svgConfig.strokeWidth)
    };
  }, [modifiedData]);

  const handleTimeFilterClick = (index) => {
    if (currentSelected.value === index) return;
    pathTransistion.value = 0;
    previousSelected.value = currentSelected.value;
    currentSelected.value = index;
    pathTransistion.value = withTiming(1);
  };

  if (!hasBeenCalculated || data.length === 0) {
    return (
      <View onLayout={onLayout} style={chartStyle}>
        <Skeleton style={GLOBAL_STYLES.fullContainer} />
      </View>
    );
  }

  return (
    <View style={[STYLES.container, { width: chartStyle.width || "100%" }]}>
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
      <View style={[chartStyle, STYLES.relativePosition]}>
        <Svg style={GLOBAL_STYLES.fullContainer}>
          <AnimatedPath animatedProps={animatedPathProps} {...svgConfig} stroke={themeColors.text} />
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
          STYLES.timeFilterContainer,
          animatedTimeFilters,
          { backgroundColor: isDarkMode ? themeColors.surface : themeColors.border }
        ]}
      >
        <View style={StyleSheet.absoluteFill}>
          <Reanimated.View
            style={[
              STYLES.timeFilterOverlay,
              {
                width: buttonWidth,
                backgroundColor: isDarkMode ? themeColors.border : themeColors.surface
              },
              animatedLabelOverlay
            ]}
          />
        </View>
        {data.map((d, i) => (
          <PressableView key={d.label} onPress={() => handleTimeFilterClick(i)} viewStyle={{ width: buttonWidth }}>
            <Text style={STYLES.timeFilterLabel}>{d.label}</Text>
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
  timeFilterLabel: {
    ...TYPOGRAPHY.subheading,
    ...TYPOGRAPHY.textAlignCenter
  },
  timeFilterContainer: {
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
  timeFilterOverlay: {
    ...StyleSheet.absoluteFillObject
  }
});

export default LineChart;
