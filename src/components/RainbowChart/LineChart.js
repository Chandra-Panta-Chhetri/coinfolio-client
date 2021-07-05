import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { buildGraph } from "./utils";
import Reanimated, {
  useAnimatedStyle,
  useAnimatedProps,
  useSharedValue,
  withTiming
} from "react-native-reanimated";
import { mixPath } from "react-native-redash";
import Cursor from "./Cursor";
import Header from "./Header";

const AnimatedPath = Reanimated.createAnimatedComponent(Path);

const HEIGHT_OF_LINE_GRAPH = 88;
const HEIGHT_MULTIPLIER = HEIGHT_OF_LINE_GRAPH / 100;

const LineChart = ({ data = [], style, initialSelectedGraph = 0 }) => {
  const [containerDimensions, setContainerDimensions] = useState({
    width: 0,
    height: 0,
    hasBeenCalculated: false
  });
  const [dataWithPaths, setDataWithPaths] = useState(data);

  const { width, height, hasBeenCalculated } = containerDimensions;
  const buttonWidth = data.length === 0 ? 0 : width / data.length;

  const svgPathTransistion = useSharedValue(0);
  const previousSelected = useSharedValue(initialSelectedGraph);
  const currentSelected = useSharedValue(initialSelectedGraph);
  const y = useSharedValue(0);

  const animatedLabelOverlay = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: withTiming(buttonWidth * currentSelected.value) }
      ]
    };
  }, [buttonWidth]);

  const animatedPathProps = useAnimatedProps(() => {
    const previousPath = dataWithPaths[previousSelected.value].data.path;
    const currentPath = dataWithPaths[currentSelected.value].data.path;

    return {
      d: !previousPath
        ? ""
        : mixPath(svgPathTransistion.value, previousPath, currentPath)
    };
  }, [dataWithPaths]);

  const onLayout = (event) => {
    const height = event.nativeEvent.layout.height;
    const width = event.nativeEvent.layout.width;

    if (hasBeenCalculated) {
      return;
    }

    const formattedData = data.map((graph) => ({
      ...graph,
      data: buildGraph(graph.data, width, height * HEIGHT_MULTIPLIER)
    }));

    setContainerDimensions({ height, width, hasBeenCalculated: true });
    setDataWithPaths(formattedData);
  };

  const handleGraphLabelSelect = (index) => {
    svgPathTransistion.value = 0;
    previousSelected.value = currentSelected.value;
    currentSelected.value = index;
    svgPathTransistion.value = withTiming(1);
  };

  return (
    <View style={[styles.container, style]} onLayout={onLayout}>
      {width > 0 && height > 0 && (
        <>
          <Header
            data={dataWithPaths}
            selected={currentSelected}
            maxHeight={height}
            yPos={y}
          />
          <View style={styles.headerContainer}>
            <Svg width="100%" height="100%">
              <AnimatedPath
                animatedProps={animatedPathProps}
                fill="transparent"
                stroke="black"
                strokeWidth={3}
              />
            </Svg>
            <Cursor
              dataWithPaths={dataWithPaths}
              selected={currentSelected}
              maxWidth={width}
              yPos={y}
              maxHeight={height * HEIGHT_MULTIPLIER}
            />
          </View>
          <View style={[styles.selection]}>
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
        </>
      )}
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
  selection: {
    flexDirection: "row",
    alignSelf: "center",
    width: "100%"
  },
  label: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center"
  },
  headerContainer: {
    height: `${HEIGHT_OF_LINE_GRAPH}%`
  }
});

export default LineChart;
