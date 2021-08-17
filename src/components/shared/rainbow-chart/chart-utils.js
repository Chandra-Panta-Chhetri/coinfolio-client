import * as shape from "d3-shape";
import { scaleLinear } from "d3-scale";
import { parse } from "react-native-redash";
import CONSTANTS from "../../../Constants";

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

export const buildLineChart = (
  data,
  chartWidth = 0,
  chartHeight = 0,
  { xValueAccessor, yValueAccessor, percentChangeAccessor, dataPointsAccessor },
  maxPointsToShow = CONSTANTS.LINE_CHART.MAX_NUM_POINTS_TO_SHOW
) => {
  const dataPoints = dataPointsAccessor(data).slice(0, maxPointsToShow);
  const parsedDataPoints = dataPoints.map((dp) => [
    parseFloat(xValueAccessor(dp)),
    parseFloat(yValueAccessor(dp))
  ]);
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
    percentChange: percentChangeAccessor(data),
    path: parse(svgPath),
    labelCoordinates: [
      {
        x: scaleX(parsedDataPoints[extremas.y.indexOfMaxYVal][0]),
        y: -25,
        val: extremas.y.maxVal
      },
      {
        x: scaleX(parsedDataPoints[extremas.y.indexOfMinYVal][0]),
        y: chartHeight - 4,
        val: extremas.y.minVal
      }
    ],
    xAxis: {
      domain: scaleXDomain,
      range: scaleXRange
    },
    yAxis: {
      domain: scaleYDomain,
      range: scaleYRange
    }
  };
};

export const formatData = (data, chartWidth, chartHeight, valueAccessors) =>
  data.map((d) => ({
    label: d.label,
    data: {
      defaultTimeLabel: d.defaultTimeLabel,
      ...buildLineChart(d.data, chartWidth, chartHeight, valueAccessors)
    }
  }));

function formatAmPm(date) {
  "worklet";
  const hours = date.getHours() <= 12 ? date.getHours() : date.getHours() - 12;
  const formattedHour = hours < 10 ? "0" + hours : hours;
  const minutes =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  const amOrPm = date.getHours() >= 12 ? "PM" : "AM";
  return formattedHour + ":" + minutes + " " + amOrPm;
}

export function formatTime(date) {
  "worklet";
  const jsDate = new Date(date * 1000);
  const dateStr = jsDate.toDateString().split(" ").slice(1, 4).join(" ");
  const timeStr = formatAmPm(jsDate);
  return `${dateStr} ${timeStr}`;
}

export function boundXCoordinate(val, upperBound, labelWidth) {
  "worklet";
  if (val + labelWidth > upperBound) {
    return val - labelWidth - 7;
  }
  return val - labelWidth / 2 < 0 ? 0 : val - labelWidth / 2;
}
