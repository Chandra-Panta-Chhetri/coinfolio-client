import * as shape from "d3-shape";
import { scaleLinear } from "d3-scale";
import { parse } from "react-native-redash";
import CONSTANTS from "../../Constants";

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
  const prices = formattedValues.map((value) => value[0]);
  const dates = formattedValues.map((value) => value[1]);
  const scaleX = scaleLinear()
    .domain([Math.min(...dates), Math.max(...dates)])
    .range([0, xAxisSize]);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const scaleY = scaleLinear()
    .domain([minPrice, maxPrice])
    .range([yAxisSize, 0]);
  const svgPath = shape
    .line()
    .x(([, x]) => scaleX(x))
    .y(([y]) => scaleY(y))
    .curve(shape.curveBasis)(formattedValues);
  return {
    minPrice,
    maxPrice,
    percentChange: datapoints.percent_change,
    path: parse(svgPath)
  };
};
