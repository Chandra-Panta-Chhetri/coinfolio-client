import SUMMARY_ACTION_TYPES from "./summary.action.types";

const INITIAL_STATE = {
  topCoins: [],
  gainersLosers: [],
  news: [],
  global: null,
  numLoadingReq: 4
};

const notificationReducer = (prevState = INITIAL_STATE, action) => {
  switch (action.type) {
    case SUMMARY_ACTION_TYPES.TOP_COINS_FETCH_FAIL:
    case SUMMARY_ACTION_TYPES.NEWS_SUMMARY_FETCH_FAIL:
    case SUMMARY_ACTION_TYPES.GAINERS_LOSERS_FETCH_FAIL:
    case SUMMARY_ACTION_TYPES.GLOBAL_SUMMARY_FETCH_FAIL:
      return {
        ...prevState,
        numLoadingReq: prevState.numLoadingReq - 1
      };
    case SUMMARY_ACTION_TYPES.TOP_COINS_FETCH_SUCCESS:
      return {
        ...prevState,
        topCoins: action.payload.topCoins,
        numLoadingReq: prevState.numLoadingReq - 1
      };
    case SUMMARY_ACTION_TYPES.GLOBAL_SUMMARY_FETCH_SUCCESS:
      return {
        ...prevState,
        global: action.payload.globalSummary,
        numLoadingReq: prevState.numLoadingReq - 1
      };
    case SUMMARY_ACTION_TYPES.NEWS_SUMMARY_FETCH_SUCCESS:
      return {
        ...prevState,
        news: action.payload.news,
        numLoadingReq: prevState.numLoadingReq - 1
      };
    case SUMMARY_ACTION_TYPES.GAINERS_LOSERS_FETCH_SUCCESS:
      return {
        ...prevState,
        gainersLosers: action.payload.gainersLosers,
        numLoadingReq: prevState.numLoadingReq - 1
      };
    default:
      return prevState;
  }
};

export default notificationReducer;
