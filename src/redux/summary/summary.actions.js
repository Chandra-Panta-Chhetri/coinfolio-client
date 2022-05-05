import SUMMARY_ACTION_TYPES from "./summary.action.types";

export const startTopCoinsFetch = () => ({
  type: SUMMARY_ACTION_TYPES.START_TOP_COINS_FETCH
});

export const topCoinsFetchSuccess = (coins) => ({
  type: SUMMARY_ACTION_TYPES.TOP_COINS_FETCH_SUCCESS,
  payload: coins
});

export const topCoinsFetchFail = (errorMsg) => ({
  type: SUMMARY_ACTION_TYPES.TOP_COINS_FETCH_FAIL,
  payload: {
    errorMsg
  }
});

export const startGainersLosersFetch = () => ({
  type: SUMMARY_ACTION_TYPES.START_GAINERS_LOSERS_FETCH
});

export const gainersLosersFetchSuccess = (coins) => ({
  type: SUMMARY_ACTION_TYPES.GAINERS_LOSERS_FETCH_SUCCESS,
  payload: coins
});

export const gainersLosersFetchFail = (errorMsg) => ({
  type: SUMMARY_ACTION_TYPES.GAINERS_LOSERS_FETCH_FAIL,
  payload: {
    errorMsg
  }
});

export const startNewsSummaryFetch = () => ({
  type: SUMMARY_ACTION_TYPES.NEWS_SUMMARY_FETCH
});

export const newsSummarySuccess = (news) => ({
  type: SUMMARY_ACTION_TYPES.NEWS_SUMMARY_SUCCESS,
  payload: news
});

export const newsSummaryFail = (errorMsg) => ({
  type: SUMMARY_ACTION_TYPES.NEWS_SUMMARY_FAIL,
  payload: {
    errorMsg
  }
});

export const startGlobalSummaryFetch = () => ({
  type: SUMMARY_ACTION_TYPES.START_GLOBAL_SUMMARY_FETCH
});

export const globalSummaryFetchSuccess = (summary) => ({
  type: SUMMARY_ACTION_TYPES.GLOBAL_SUMMARY_FETCH_SUCCESS,
  payload: summary
});

export const globalSummaryFetchFail = (errorMsg) => ({
  type: SUMMARY_ACTION_TYPES.GLOBAL_SUMMARY_FETCH_FAIL,
  payload: {
    errorMsg
  }
});
