import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { buildGraph } from "./chart-utils";
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
import CONSTANTS from "../../Constants";

const AnimatedPath = Reanimated.createAnimatedComponent(Path);

const LineChart = ({
  data = [],
  chartStyle,
  initialSelectedGraph = 0,
  svgConfig = CONSTANTS.LINE_CHART_SVG_CONFIG
}) => {
  const [chartDimensions, setChartDimensions] = useState({
    width: 0,
    height: 0
  });
  const [modifiedData, setModifiedData] = useState(data);

  const onLayout = (event) => {
    const chartHeight = event.nativeEvent.layout.height;
    const chartWidth = event.nativeEvent.layout.width;

    const formattedData = data.map((d) => ({
      label: d.label,
      data: buildGraph(d.data, chartWidth, chartHeight)
    }));

    setModifiedData(formattedData);
    setChartDimensions({ height: chartHeight, width: chartWidth });
  };

  const { width, height } = chartDimensions;
  const buttonWidth = data.length && width / data.length;

  const svgPathTransistion = useSharedValue(0);
  const previousSelected = useSharedValue(initialSelectedGraph);
  const currentSelected = useSharedValue(initialSelectedGraph);
  const y = useSharedValue(0);
  const x = useSharedValue(0);
  const isPanGestureActive = useSharedValue(false);

  const selectedGraph = useDerivedValue(
    () => modifiedData[currentSelected.value].data,
    [modifiedData]
  );

  const animatedLabelOverlay = useAnimatedStyle(
    () => ({
      transform: [
        { translateX: withTiming(buttonWidth * currentSelected.value) }
      ]
    }),
    [buttonWidth]
  );

  const animatedPathProps = useAnimatedProps(() => {
    const previousPath = modifiedData[previousSelected.value].data.path;
    const currentPath = modifiedData[currentSelected.value].data.path;

    return {
      d: !previousPath
        ? ""
        : mixPath(svgPathTransistion.value, previousPath, currentPath),
      strokeWidth: isPanGestureActive.value
        ? svgConfig.strokeWidth + 1
        : svgConfig.strokeWidth
    };
  }, [modifiedData, svgConfig]);

  const handleGraphLabelSelect = (index) => {
    if (currentSelected.value === index) return;
    svgPathTransistion.value = 0;
    previousSelected.value = currentSelected.value;
    currentSelected.value = index;
    svgPathTransistion.value = withTiming(1);
  };

  if (width === 0 && height === 0) {
    return (
      <View onLayout={onLayout} style={[chartStyle]}>
        <Skeleton style={styles.fullContainerSpace} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { width: chartStyle.width || "100%" }]}>
      <View style={styles.headerContainer}>
        <Header
          maxHeight={height}
          yPos={y}
          selectedGraph={selectedGraph}
          xPos={x}
          maxWidth={width}
        />
      </View>
      <View style={[chartStyle, { position: "relative" }]}>
        <Svg style={styles.fullContainerSpace}>
          <AnimatedPath animatedProps={animatedPathProps} {...svgConfig} />
        </Svg>
        <Cursor
          maxWidth={width}
          yPos={y}
          isPanGestureActive={isPanGestureActive}
          selectedGraph={selectedGraph}
          xPos={x}
        />
        {[1, 2].map((_, i) => (
          <Label
            key={i}
            isPanGestureActive={isPanGestureActive}
            indexOfCoordinates={i}
            selectedGraph={selectedGraph}
            maxWidth={width}
          />
        ))}
      </View>
      <View style={[styles.bottomLabelContainer]}>
        <View style={StyleSheet.absoluteFill}>
          <Reanimated.View
            style={[
              styles.backgroundSelection,
              {
                width: buttonWidth
              },
              animatedLabelOverlay
            ]}
          />
        </View>
        {data.map((d, i) => (
          <TouchableWithoutFeedback
            key={d.label}
            onPress={() => handleGraphLabelSelect(i)}
          >
            <View style={{ width: buttonWidth }}>
              <Text style={styles.label}>{d.label}</Text>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between"
  },
  backgroundSelection: {
    backgroundColor: "#f3f3f3",
    ...StyleSheet.absoluteFillObject,
    borderRadius: 5
  },
  bottomLabelContainer: {
    flexDirection: "row",
    alignSelf: "center",
    width: "100%",
    marginTop: 18
  },
  label: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
    letterSpacing: 1
  },
  headerContainer: {
    marginBottom: 18
  },
  fullContainerSpace: {
    width: "100%",
    height: "100%"
  }
});

export default LineChart;
