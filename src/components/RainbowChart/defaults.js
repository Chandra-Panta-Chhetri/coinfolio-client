import { COLORS } from "../../constants";

const RAINBOW_CHART_DEFAULTS = {
  SVG_LINE_CONFIG: {
    fill: COLORS.TRANSPARENT,
    strokeWidth: 2
  },
  CURSOR_SIZE: 15,
  ACTIVE_GESTURE_ANIMATION_CONFIG: {
    overshootClamping: true
  },
  SELECTED_GRAPH: 0,
  DATA_POINTS: []
};

export default RAINBOW_CHART_DEFAULTS;
