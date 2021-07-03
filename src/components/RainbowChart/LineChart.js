import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { buildGraph } from "./utils";

const HEIGHT_OF_LINE_GRAPH = 88;
const HEIGHT_MULTIPLIER = HEIGHT_OF_LINE_GRAPH / 100;

const LineChart = ({ data = [], style, initialSelectedGraph = 0 }) => {
  const [selected, setSelected] = useState(initialSelectedGraph);
  const [containerDimensions, setContainerDimensions] = useState({
    width: 0,
    height: 0
  });
  const [dataWithPaths, setDataWithPaths] = useState(data);

  const currentGraph = dataWithPaths[selected].data;
  const { width, height } = containerDimensions;
  const buttonWidth = data.length === 0 ? 0 : width / data.length;

  useEffect(() => {
    const formattedData = data.map((graph) => ({
      ...graph,
      data: buildGraph(graph.data, width, height * HEIGHT_MULTIPLIER)
    }));
    setDataWithPaths(formattedData);
  }, [containerDimensions]);

  const onLayout = (event) => {
    const height = event.nativeEvent.layout.height;
    const width = event.nativeEvent.layout.width;
    setContainerDimensions({ height, width });
  };

  const handleGraphLabelSelect = (index) => {
    setSelected(index);
  };

  return (
    <View style={[styles.container, style]} onLayout={onLayout}>
      {width > 0 && height > 0 && (
        <>
          <View style={styles.headerContainer}>
            {/* <Header data={current} /> */}
            <Svg width="100%" height="100%">
              <Path
                d={currentGraph.path}
                fill="transparent"
                stroke="black"
                strokeWidth={3}
              />
            </Svg>
            {/* <Cursor data={current} /> */}
          </View>
          <View style={[styles.selection]}>
            <View style={StyleSheet.absoluteFill}>
              <View
                style={[
                  styles.backgroundSelection,
                  {
                    transform: [
                      {
                        translateX: buttonWidth * selected
                      }
                    ],
                    width: buttonWidth
                  }
                ]}
              />
            </View>
            {data.map((graph, index) => {
              return (
                <TouchableWithoutFeedback
                  key={graph.label}
                  onPress={() => handleGraphLabelSelect(index)}
                >
                  <View style={{ width: buttonWidth }}>
                    <Text style={styles.label}>{graph.label}</Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
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
