import { Easing } from "react-native-reanimated";

const CONSTANTS = {
  LINE_CHART: {
    MAX_NUM_POINTS_TO_SHOW: 60,
    SVG_LINE_CONFIG: {
      fill: "transparent",
      strokeWidth: 2
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
    SLICE_COLORS: ["#ced6e5", "#f8921c", "#627eea", "#f2ba31", "#4c9d7c"]
  },
  SHARED: {
    EMPTY_FUNCTION: () => {},
    MIN_ANDROID_VERSION_FOR_TOUCHABLE_RIPPLES: 21,
    TAB_ICON_SIZE: 21.5,
    AVATAR_IMAGE_SIZE: 35,
    TAB_HEADING_ICON_SIZE: 20,
    TOUCHABLE_ACTIVE_OPACITY: 0.6,
    TABLE_BORDER_WIDTH: 0.4,
    BORDER_WIDTH: 1
  },
  SHORTCUT_ICONS: [
    {
      label: "Price Alerts",
      iconName: "bell-alert",
      navigateTo: "PriceAlert"
    },
    {
      label: "Compare",
      iconName: "compare",
      navigateTo: "Compare"
    },
    {
      label: "Converter",
      iconName: "calculator",
      navigateTo: "Converter"
    },
    {
      label: "Watchlist",
      iconName: "eye",
      navigateTo: "Market"
    }
  ],
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
  },
  SETTINGS: {
    ICON_SIZE: 18,
    MORE_OPTIONS_ARROW_ICON_SIZE: 25,
    ICON_COLOR: "white",
    CHANGE_PASSWORD_BACKGROUND_COLOR: "#1a87ff",
    CHANGE_EMAIL_BACKGROUND_COLOR: "#4ecf3b",
    LOG_OUT_BACKGROUND_COLOR: "#eb1c1b",
    DARK_MODE_BACKGROUND_COLOR: "#44484b",
    RECEIVE_NOTIFICATIONS_BACKGROUND_COLOR: "#f85a27",
    CURRENCY_BACKGROUND_COLOR: "#4ecf3b",
    HOME_SCREEN_BACKGROUND_COLOR: "#1a87ff",
    PRIVACY_MODE_BACKGROUND_COLOR: "#8c32fb",
    BIOMETRIC_BACKGROUND_COLOR: "#f85a27",
    TERMS_AND_PRIVACY_BACKGROUND_COLOR: "#44484b",
    SHARE_BACKGROUND_COLOR: "#8c32fb",
    VERSION_BACKGROUND_COLOR: "#1a87ff"
  },
  SNACKBAR: {
    SUCCESS: "#4ecf3b",
    ERROR: "#eb1c1b",
    INFO: "#1a87ff",
    WARNING: "#f0ad4e",
    DURATION: 2300
  },
  SHARE_DOWNLOAD_LINK: {
    IOS: "https://play.google.com/store/apps/details?id=com.coinmarketcap.android",
    ANDROID:
      "https://play.google.com/store/apps/details?id=com.coinmarketcap.android"
  },
  LATEST_NEWS: {
    FILTERS: [
      {
        label: "Important",
        value: "important"
      },
      {
        label: "Rising",
        value: "rising"
      },
      {
        label: "Hot",
        value: "hot"
      }
    ],
    NUM_NEWS_TO_SHOW: 12,
    DEFAULT_FILTER_INDEX: 2
  },
  LATEST_EVENTS: {
    FILTERS: [],
    NUM_EVENTS_TO_SHOW: 12
  }
};

export default CONSTANTS;
