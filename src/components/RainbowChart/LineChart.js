import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import Svg, { Path } from "react-native-svg";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { buildGraph } from "./utils";
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
import ChartLabelItem from "./ChartLabelItem";
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
    const height = event.nativeEvent.layout.height;
    const width = event.nativeEvent.layout.width;

    const formattedData = data.map((d) => ({
      ...d,
      data: buildGraph(d.data, width, height)
    }));

    setModifiedData([...formattedData]);
    setChartDimensions({ height, width });
  };

  const { width, height } = chartDimensions;
  const buttonWidth = data.length === 0 ? 0 : width / data.length;

  const svgPathTransistion = useSharedValue(0);
  const previousSelected = useSharedValue(initialSelectedGraph);
  const currentSelected = useSharedValue(initialSelectedGraph);
  const y = useSharedValue(0);
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
    <View
      style={[
        styles.container,
        { width: chartStyle.width ? chartStyle.width : "100%" }
      ]}
    >
      <View style={styles.headerContainer}>
        <Header maxHeight={height} yPos={y} selectedGraph={selectedGraph} />
      </View>
      <View style={[chartStyle, { position: "relative" }]}>
        <Svg width="100%" height="100%">
          <AnimatedPath animatedProps={animatedPathProps} {...svgConfig} />
        </Svg>
        <Cursor
          maxWidth={width}
          yPos={y}
          isPanGestureActive={isPanGestureActive}
          selectedGraph={selectedGraph}
        />
        {[1, 2].map((_, i) => (
          <ChartLabelItem
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
        {data.map((graph, index) => (
          <TouchableWithoutFeedback
            key={graph.label}
            onPress={() => handleGraphLabelSelect(index)}
          >
            <View style={{ width: buttonWidth }}>
              <Text style={styles.label}>{graph.label}</Text>
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
