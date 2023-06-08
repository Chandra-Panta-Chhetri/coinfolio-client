import SUMMARY_ACTION_TYPES from "./summary.action.types";

const INITIAL_STATE = {
  topCoins: [],
  gainersLosers: [],
  news: [],
  global: null,
  isLoadingGlobalSummary: true,
  isLoadingTopCoins: true,
  isLoadingGainersLosers: true,
  isLoadingNewsSummary: true
};

const summaryReducer = (prevState = INITIAL_STATE, action) => {
  switch (action?.type) {
    case SUMMARY_ACTION_TYPES.FETCH_GLOBAL_SUMMARY:
      return {
        ...prevState,
        isLoadingGlobalSummary: true
      };
    case SUMMARY_ACTION_TYPES.FETCH_TOP_COINS:
      return {
        ...prevState,
        isLoadingTopCoins: true
      };
    case SUMMARY_ACTION_TYPES.FETCH_GAINERS_LOSERS:
      return {
        ...prevState,
        isLoadingGainersLosers: true
      };
    case SUMMARY_ACTION_TYPES.FETCH_NEWS_SUMMARY:
      return {
        ...prevState,
        isLoadingNewsSummary: true
      };
    case SUMMARY_ACTION_TYPES.FETCH_GLOBAL_SUMMARY_FAIL:
      return {
        ...prevState,
        isLoadingGlobalSummary: false
      };
    case SUMMARY_ACTION_TYPES.FETCH_TOP_COINS_FAIL:
      return {
        ...prevState,
        isLoadingTopCoins: false
      };
    case SUMMARY_ACTION_TYPES.FETCH_NEWS_SUMMARY_FAIL:
      return {
        ...prevState,
        isLoadingNewsSummary: false
      };
    case SUMMARY_ACTION_TYPES.FETCH_GAINERS_LOSERS_FAIL:
      return {
        ...prevState,
        isLoadingGainersLosers: false
      };
    case SUMMARY_ACTION_TYPES.FETCH_TOP_COINS_SUCCESS:
      return {
        ...prevState,
        topCoins: action?.payload,
        isLoadingTopCoins: false
      };
    case SUMMARY_ACTION_TYPES.FETCH_GLOBAL_SUMMARY_SUCCESS:
      return {
        ...prevState,
        global: action?.payload,
        isLoadingGlobalSummary: false
      };
    case SUMMARY_ACTION_TYPES.FETCH_NEWS_SUMMARY_SUCCESS:
      return {
        ...prevState,
        news: action?.payload,
        isLoadingNewsSummary: false
      };
    case SUMMARY_ACTION_TYPES.FETCH_GAINERS_LOSERS_SUCCESS:
      return {
        ...prevState,
        gainersLosers: action?.payload,
        isLoadingGainersLosers: false
      };
    case SUMMARY_ACTION_TYPES.UPDATE_GAINERS_LOSERS:
      return {
        ...prevState,
        gainersLosers: action?.payload
      };
    case SUMMARY_ACTION_TYPES.UPDATE_TOP_COINS:
      return {
        ...prevState,
        topCoins: action?.payload
      };
    default:
      return prevState;
  }
};

export default summaryReducer;
