import { Easing } from "react-native-reanimated";

const CONSTANTS = {
  LINE_CHART: {
    MAX_NUM_POINTS_TO_SHOW: 60,
    SVG_LINE_CONFIG: {
      fill: "transparent",
      stroke: "black",
      strokeWidth: 3
    },
    CURSOR_SIZE: 15,
    ACTIVE_GESTURE_ANIMATION_CONFIG: {
      overshootClamping: true
    },
    DEFAULT_ACCESSOR_FUNC: () => null
  },
  TOP_COINS: {
    NUM_SKELETON_TO_SHOW: 10
  },
  NEWS_SUMMARY: {
    NUM_SKELETON_TO_SHOW: 3
  },
  GAINERS_LOSERS: {
    NUM_SKELETON_TO_SHOW: 4
  },
  TABS: {
    SWITCH_ANIMATION_CONFIG: {
      duration: 280,
      easing: Easing.inOut(Easing.quad)
    }
  },
  PIE_CHART: {
    INNER_LABEL_CONFIG: {
      textAnchor: "middle",
      fill: "black",
      dy: "0.50em"
    },
    MAX_RADIUS_OFFSET: 2,
    SELECTED_ELEVATION: 5,
    DEFAULT_END_ANGLE: Math.PI * 2,
    DEFAULT_START_ANGLE: 0,
    DEFAULT_PAD_ANGLE: 0,
    DEFAULT_SORT_FUNCTION: (a, b) => b.value - a.value,
    DEFAULT_VALUE_ACCESSOR_FUNCTION: ({ item }) => item.value,
    DEFAULT_INNER_LABEL_VALUE_ACCESSOR_FUNCTION: (selectedSlice) =>
      `${selectedSlice.key} - ${selectedSlice.value}%`
  },
  PORTFOLIO: {
    SUMMARY_TAB_HEADING_MARGIN_BOTTOM: 10
  },
  ALLOCATIONS: {
    MAX_NUM_TO_SHOW: 5,
    SLICE_COLORS: ["#21e6c1", "#278ea5", "#1f4287", "#071e3d", "#28c7fa"]
  },
  SHARED: {
    EMPTY_FUNCTION: () => {},
    MIN_ANDROID_VERSION_FOR_TOUCHABLE_RIPPLES: 21,
    TOUCHABLE_RIPPLE_COLOR: "grey",
    BOTTOM_TAB_ICON_SIZE: 21.5,
    AVATAR_IMAGE_SIZE: 35,
    TAB_HEADING_ICON_SIZE: 20,
    TOUCHABLE_ACTIVE_OPACITY: 0.6
  },
  SHORTCUT_ICONS: [
    {
      label: "Price Alerts",
      iconName: "bell-alert",
      navigateTo: "PriceAlert",
      iconColor: "rgb(10, 132, 255)"
    },
    {
      label: "Compare",
      iconName: "compare",
      navigateTo: "Compare",
      iconColor: "rgb(10, 132, 255)"
    },
    {
      label: "Converter",
      iconName: "calculator",
      navigateTo: "Converter",
      iconColor: "rgb(10, 132, 255)"
    },
    {
      label: "Watchlist",
      iconName: "eye",
      navigateTo: "Market",
      iconColor: "rgb(10, 132, 255)"
    }
  ],
  NOTIFICATION_SNACKBAR: {
    DURATION: 5000
  },
  ASSETS_BREAKDOWN: {
    SORT_ICON_SIZE: 12
  },
  GLOBAL_MARKET_SUMMARY: {
    METRICS: [
      {
        label: "Market Cap",
        valueAccessorFunc: (summary) => `$${summary["marketCap"]}`
      },
      {
        label: "24h Vol",
        valueAccessorFunc: (summary) => `$${summary["24hVolume"]}`
      },
      {
        label: "BTC Dominance",
        valueAccessorFunc: (summary) => `${summary["btcDominance"]}%`
      },
      {
        label: "ETH Dominance",
        valueAccessorFunc: (summary) => `${summary["ethDominance"]}%`
      }
    ]
  }
};

export default CONSTANTS;
