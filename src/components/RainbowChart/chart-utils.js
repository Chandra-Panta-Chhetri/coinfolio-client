import * as shape from "d3-shape";
import { scaleLinear } from "d3-scale";
import { parse } from "react-native-redash";
import CONSTANTS from "../../Constants";

const findMaxAndMinY = (datapoints) => {
  if (datapoints.length === 0) {
    return { minVal: null, minIndex: null, maxVal: null, maxIndex: null };
  }

  let minIndex = 0;
  let maxIndex = 0;

  for (let i = 1; i < datapoints.length; i++) {
    if (datapoints[minIndex][0] > datapoints[i][0]) {
      minIndex = i;
    }

    if (datapoints[maxIndex][0] < datapoints[i][0]) {
      maxIndex = i;
    }
  }

  return {
    minVal: datapoints[minIndex][0],
    minIndex,
    maxIndex,
    maxVal: datapoints[maxIndex][0]
  };
};

export const buildGraph = (
  datapoints,
  xAxisSize = 0,
  yAxisSize = 0,
  maxPointsToShow = CONSTANTS.LINE_CHART_MAX_NUM_POINTS_TO_SHOW
) => {
  const priceList = datapoints.prices.slice(0, maxPointsToShow);
  const formattedValues = priceList.map((price) => [
    parseFloat(price[0]),
    price[1]
  ]);
  const extremas = findMaxAndMinY(formattedValues);
  const dates = formattedValues.map((value) => value[1]);
  const scaleXDomain = [Math.min(...dates), Math.max(...dates)];
  const scaleYDomain = [extremas.minVal, extremas.maxVal];
  const scaleX = scaleLinear().domain(scaleXDomain).range([0, xAxisSize]);
  const scaleY = scaleLinear().domain(scaleYDomain).range([yAxisSize, 0]);

  const svgPath = shape
    .line()
    .x(([, x]) => scaleX(x))
    .y(([y]) => scaleY(y))
    .curve(shape.curveBasis)(formattedValues);

  return {
    percentChange: datapoints.percent_change,
    path: parse(svgPath),
    labelCoordinates: [
      {
        x: scaleX(formattedValues[extremas.maxIndex][1]),
        y: -25,
        val: extremas.maxVal
      },
      {
        x: scaleX(formattedValues[extremas.minIndex][1]),
        y: yAxisSize - 4,
        val: extremas.minVal
      }
    ],
    scaleX: {
      domain: scaleXDomain
    },
    scaleY: {
      domain: scaleYDomain
    }
  };
};
