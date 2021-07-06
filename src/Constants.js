import { Easing } from "react-native-reanimated";

const CONSTANTS = {
  LINE_CHART_MAX_NUM_POINTS_TO_SHOW: 60,
  LINE_CHART_SVG_CONFIG: {
    fill: "transparent",
    stroke: "black",
    strokeWidth: 3
  },
  LINE_CHART_CURSOR_SIZE: 15,
  LINE_CHART_ACTIVE_GESTURE_ANIMATION_CONFIG: {
    overshootClamping: true
  },
  TOP_COINS_NUM_SKELETON_TO_SHOW: 10,
  NEWS_SUMMARY_NUM_SKELETON_TO_SHOW: 3,
  GAINERS_LOSERS_NUM_SKELETON_TO_SHOW: 4,
  TABS_SLIDE_ANIMATION_CONFIG: {
    duration: 280,
    easing: Easing.inOut(Easing.quad)
  },
  PIE_CHART_INNER_LABEL_CONFIG: {
    textAnchor: "middle",
    fill: "black",
    dy: "0.50em",
    fontSize: 16,
    fontWeight: "bold"
  },
  PIE_CHART_MAX_RADIUS_OFFSET: 2,
  PIE_CHART_SELECTED_ELEVATION: 5,
  PIE_CHART_END_ANGLE: Math.PI * 2,
  PIE_CHART_START_ANGLE: 0,
  PIE_CHART_PAD_ANGLE: 0
};

export default CONSTANTS;
