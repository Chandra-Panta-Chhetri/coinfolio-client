import SUMMARY_ACTION_TYPES from "./summary.action.types";

const INITIAL_STATE = {
  topCoins: [],
  gainersLosers: [],
  news: [],
  global: null,
  isLoadingGlobal: true,
  isLoadingTopCoins: true,
  isLoadingGainersLosers: true,
  isLoadingNewsSummary: true
};

const summaryReducer = (prevState = INITIAL_STATE, action) => {
  switch (action.type) {
    case SUMMARY_ACTION_TYPES.START_GLOBAL_SUMMARY_FETCH:
      return {
        ...prevState,
        isLoadingGlobal: true
      };
    case SUMMARY_ACTION_TYPES.START_TOP_COINS_FETCH:
      return {
        ...prevState,
        isLoadingTopCoins: true
      };
    case SUMMARY_ACTION_TYPES.START_GAINERS_LOSERS_FETCH:
      return {
        ...prevState,
        isLoadingGainersLosers: true
      };
    case SUMMARY_ACTION_TYPES.NEWS_SUMMARY_FETCH:
      return {
        ...prevState,
        isLoadingNewsSummary: true
      };
    case SUMMARY_ACTION_TYPES.GLOBAL_SUMMARY_FETCH_FAIL:
      return {
        ...prevState,
        isLoadingGlobal: false
      };
    case SUMMARY_ACTION_TYPES.TOP_COINS_FETCH_FAIL:
      return {
        ...prevState,
        isLoadingTopCoins: false
      };
    case SUMMARY_ACTION_TYPES.NEWS_SUMMARY_FAIL:
      return {
        ...prevState,
        isLoadingNewsSummary: false
      };
    case SUMMARY_ACTION_TYPES.GAINERS_LOSERS_FETCH_FAIL:
      return {
        ...prevState,
        isLoadingGainersLosers: false
      };
    case SUMMARY_ACTION_TYPES.TOP_COINS_FETCH_SUCCESS:
      return {
        ...prevState,
        topCoins: action.payload,
        isLoadingTopCoins: false
      };
    case SUMMARY_ACTION_TYPES.GLOBAL_SUMMARY_FETCH_SUCCESS:
      return {
        ...prevState,
        global: action.payload,
        isLoadingGlobal: false
      };
    case SUMMARY_ACTION_TYPES.NEWS_SUMMARY_SUCCESS:
      return {
        ...prevState,
        news: action.payload,
        isLoadingNewsSummary: false
      };
    case SUMMARY_ACTION_TYPES.GAINERS_LOSERS_FETCH_SUCCESS:
      return {
        ...prevState,
        gainersLosers: action.payload,
        isLoadingGainersLosers: false
      };
    case SUMMARY_ACTION_TYPES.UPDATE_GAINERS_LOSERS:
      return {
        ...prevState,
        gainersLosers: action.payload
      };
    case SUMMARY_ACTION_TYPES.UPDATE_TOP_COINS:
      return {
        ...prevState,
        topCoins: action.payload
      };
    default:
      return prevState;
  }
};

export default summaryReducer;
