import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";
import { formatData } from "./chart-utils";
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
import Label from "./Label";
import CONSTANTS from "../../../Constants";
import PressableView from "../PressableView";
import GlobalStyles from "../../../GlobalStyles";

const AnimatedPath = Reanimated.createAnimatedComponent(Path);

const LineChart = ({
  data = [],
  chartStyle = {},
  initialSelectedGraph = 0,
  svgConfig = CONSTANTS.LINE_CHART.SVG_LINE_CONFIG,
  xValueAccessor = CONSTANTS.LINE_CHART.DEFAULT_ACCESSOR_FUNC,
  yValueAccessor = CONSTANTS.LINE_CHART.DEFAULT_ACCESSOR_FUNC,
  percentChangeAccessor = CONSTANTS.LINE_CHART.DEFAULT_ACCESSOR_FUNC,
  dataPointsAccessor = CONSTANTS.LINE_CHART.DEFAULT_ACCESSOR_FUNC
}) => {
  const [chartDimensions, setChartDimensions] = useState({
    width: 0,
    height: 0,
    hasBeenCalculated: false
  });
  const [modifiedData, setModifiedData] = useState(data);
  const { width, height, hasBeenCalculated } = chartDimensions;

  const onLayout = (event) => {
    if (hasBeenCalculated) return;
    const chartHeight = event.nativeEvent.layout.height;
    const chartWidth = event.nativeEvent.layout.width;
    setChartDimensions({
      height: chartHeight,
      width: chartWidth,
      hasBeenCalculated: true
    });
    const valueAccessors = {
      xValueAccessor,
      yValueAccessor,
      percentChangeAccessor,
      dataPointsAccessor
    };
    const formattedData = formatData(
      data,
      chartWidth,
      chartHeight,
      valueAccessors
    );
    setModifiedData(formattedData);
  };

  const buttonWidth = data.length && width / data.length;

  const pathTransistion = useSharedValue(0);
  const previousSelected = useSharedValue(initialSelectedGraph);
  const currentSelected = useSharedValue(initialSelectedGraph);
  const yPanGesturePos = useSharedValue(0);
  const xPanGesturePos = useSharedValue(0);
  const isPanGestureActive = useSharedValue(false);

  const selectedGraph = useDerivedValue(
    () => modifiedData[currentSelected.value].data,
    [modifiedData]
  );

  const hasPathsBeenCalculated = useDerivedValue(
    () => !!selectedGraph.value.path
  );

  const animatedLabelOverlay = useAnimatedStyle(
    () => ({
      transform: [
        { translateX: withTiming(buttonWidth * currentSelected.value) }
      ]
    }),
    [buttonWidth]
  );

  const animatedTimeFilters = useAnimatedStyle(() => ({
    opacity: withTiming(
      isPanGestureActive.value || !hasPathsBeenCalculated.value ? 0 : 1
    )
  }));

  const animatedPathProps = useAnimatedProps(() => {
    const previousPath = modifiedData[previousSelected.value].data.path;
    const currentPath = modifiedData[currentSelected.value].data.path;

    return {
      d: !previousPath
        ? ""
        : mixPath(pathTransistion.value, previousPath, currentPath),
      strokeWidth: withTiming(
        isPanGestureActive.value
          ? svgConfig.strokeWidth + 1
          : svgConfig.strokeWidth
      )
    };
  }, [modifiedData, svgConfig]);

  const handleTimeFilterClick = (index) => {
    if (currentSelected.value === index) return;
    pathTransistion.value = 0;
    previousSelected.value = currentSelected.value;
    currentSelected.value = index;
    pathTransistion.value = withTiming(1);
  };

  if (width === 0 && height === 0) {
    return (
      <View onLayout={onLayout} style={chartStyle}>
        <Skeleton style={styles.fullContainerSpace} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { width: chartStyle.width || "100%" }]}>
      <View style={styles.headerContainer}>
        <Header
          yPanGesturePos={yPanGesturePos}
          selectedGraph={selectedGraph}
          xPanGesturePos={xPanGesturePos}
          hasPathsBeenCalculated={hasPathsBeenCalculated}
          isPanGestureActive={isPanGestureActive}
        />
      </View>
      <View style={[chartStyle, styles.relativePosition]}>
        <Svg style={styles.fullContainerSpace}>
          <AnimatedPath animatedProps={animatedPathProps} {...svgConfig} />
        </Svg>
        <Cursor
          maxWidth={width}
          yPanGesturePos={yPanGesturePos}
          isPanGestureActive={isPanGestureActive}
          selectedGraph={selectedGraph}
          xPanGesturePos={xPanGesturePos}
          hasPathsBeenCalculated={hasPathsBeenCalculated}
        />
        {[1, 2].map((_, i) => (
          <Label
            key={i}
            isPanGestureActive={isPanGestureActive}
            indexOfCoordinates={i}
            selectedGraph={selectedGraph}
            maxWidth={width}
            hasPathsBeenCalculated={hasPathsBeenCalculated}
          />
        ))}
      </View>
      <Reanimated.View
        style={[styles.timeFilterContainer, animatedTimeFilters]}
      >
        <View style={StyleSheet.absoluteFill}>
          <Reanimated.View
            style={[
              styles.backgroundSelection,
              GlobalStyles.borderRadius,
              {
                width: buttonWidth
              },
              animatedLabelOverlay
            ]}
          />
        </View>
        {data.map((d, i) => (
          <PressableView
            key={d.label}
            onPress={() => handleTimeFilterClick(i)}
            viewStyle={{ width: buttonWidth }}
          >
            <Text
              style={[GlobalStyles.subheading, GlobalStyles.textAlignCenter]}
            >
              {d.label}
            </Text>
          </PressableView>
        ))}
      </Reanimated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    position: "relative"
  },
  backgroundSelection: {
    backgroundColor: "#f3f3f3",
    ...StyleSheet.absoluteFillObject
  },
  timeFilterContainer: {
    flexDirection: "row",
    alignSelf: "center",
    width: "100%",
    marginTop: 30
  },
  headerContainer: {
    marginBottom: 10
  },
  fullContainerSpace: {
    width: "100%",
    height: "100%"
  },
  relativePosition: {
    position: "relative"
  }
});

export default LineChart;
