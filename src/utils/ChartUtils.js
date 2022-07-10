import * as shape from "d3-shape";
import { scaleLinear } from "d3-scale";
import { parse } from "react-native-redash";
import RAINBOW_CHART_CONSTANTS from "../shared-components/RainbowChart/constants";
import { MARKET_OVERVIEW_CONSTANTS } from "../constants";

const findMaxAndMinYX = (dataPoints) => {
  if (dataPoints.length === 0) {
    return {
      x: {
        minVal: null,
        maxVal: null
      },
      y: {
        minVal: null,
        indexOfMinYVal: null,
        maxVal: null,
        indexOfMaxYVal: null
      }
    };
  }

  let indexOfMinYVal = 0;
  let indexOfMaxYVal = 0;
  let indexOfMinXVal = 0;
  let indexOfMaxXVal = 0;

  for (let i = 1; i < dataPoints.length; i++) {
    if (dataPoints[indexOfMinYVal][1] > dataPoints[i][1]) {
      indexOfMinYVal = i;
    }

    if (dataPoints[indexOfMaxYVal][1] < dataPoints[i][1]) {
      indexOfMaxYVal = i;
    }

    if (dataPoints[indexOfMinXVal][0] > dataPoints[i][0]) {
      indexOfMinXVal = i;
    }

    if (dataPoints[indexOfMaxXVal][0] < dataPoints[i][0]) {
      indexOfMaxXVal = i;
    }
  }

  return {
    x: {
      minVal: dataPoints[indexOfMinXVal][0],
      maxVal: dataPoints[indexOfMaxXVal][0]
    },
    y: {
      minVal: dataPoints[indexOfMinYVal][1],
      indexOfMinYVal,
      indexOfMaxYVal,
      maxVal: dataPoints[indexOfMaxYVal][1]
    }
  };
};

export const buildSparkLine = (
  data = {},
  chartWidth = 0,
  chartHeight = 0,
  { xValueAccessor, yValueAccessor, dataPointsAccessor },
  maxPointsToShow = MARKET_OVERVIEW_CONSTANTS.SPARK_LINE.MAX_NUM_POINTS_TO_SHOW
) => {
  const { path } = getSvgPath(
    data,
    chartWidth,
    chartHeight,
    { xValueAccessor, yValueAccessor, dataPointsAccessor },
    maxPointsToShow
  );
  return path;
};

const getSvgPath = (
  data = {},
  chartWidth = 0,
  chartHeight = 0,
  { xValueAccessor, yValueAccessor, dataPointsAccessor },
  maxPointsToShow
) => {
  const dataPoints = (dataPointsAccessor(data) || []).slice(0, maxPointsToShow);
  const parsedDataPoints = dataPoints.map((dp) => [parseFloat(xValueAccessor(dp)), parseFloat(yValueAccessor(dp))]);
  console.log(parsedDataPoints);
  const extremas = findMaxAndMinYX(parsedDataPoints);
  const scaleXDomain = [extremas.x.minVal, extremas.x.maxVal];
  const scaleYDomain = [extremas.y.minVal, extremas.y.maxVal];
  const scaleXRange = [0, chartWidth];
  const scaleYRange = [chartHeight, 0];
  const scaleX = scaleLinear().domain(scaleXDomain).range(scaleXRange);
  const scaleY = scaleLinear().domain(scaleYDomain).range(scaleYRange);

  const svgPath = shape
    .line()
    .x((dp) => scaleX(dp[0]))
    .y((dp) => scaleY(dp[1]))
    .curve(shape.curveBasis)(parsedDataPoints);

  return {
    path: svgPath,
    xAxis: {
      domain: scaleXDomain,
      range: scaleXRange
    },
    yAxis: {
      domain: scaleYDomain,
      range: scaleYRange
    },
    dataPoints: parsedDataPoints,
    extremas,
    scaleX,
    scaleY
  };
};

export const buildLineChart = (
  data = {},
  chartWidth = 0,
  chartHeight = 0,
  { xValueAccessor, yValueAccessor, percentChangeAccessor, dataPointsAccessor },
  maxPointsToShow = RAINBOW_CHART_CONSTANTS.MAX_NUM_POINTS_TO_SHOW
) => {
  const { path, dataPoints, extremas, xAxis, yAxis, scaleX } = getSvgPath(
    data,
    chartWidth,
    chartHeight,
    { xValueAccessor, yValueAccessor, dataPointsAccessor },
    maxPointsToShow
  );
  return {
    percentChange: percentChangeAccessor(data) || 0,
    path: parse(path),
    labelCoordinates: [
      {
        x: scaleX(dataPoints[extremas.y.indexOfMaxYVal][0]),
        y: -25,
        val: extremas.y.maxVal
      },
      {
        x: scaleX(dataPoints[extremas.y.indexOfMinYVal][0]),
        y: chartHeight - 4,
        val: extremas.y.minVal
      }
    ],
    xAxis,
    yAxis
  };
};

export const formatData = (data, chartWidth, chartHeight, valueAccessors) =>
  data.map((d) => ({
    label: d.label,
    data: buildLineChart(d.history, chartWidth, chartHeight, valueAccessors)
  }));
