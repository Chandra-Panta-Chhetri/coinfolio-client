import SUMMARY_ACTION_TYPES from "./summary.action.types";

export const startTopCoinsFetch = (limit) => ({
  type: SUMMARY_ACTION_TYPES.START_TOP_COINS_FETCH,
  payload: limit
});

export const topCoinsFetchSuccess = (coins) => ({
  type: SUMMARY_ACTION_TYPES.TOP_COINS_FETCH_SUCCESS,
  payload: coins
});

export const topCoinsFetchFail = (errorMsg) => ({
  type: SUMMARY_ACTION_TYPES.TOP_COINS_FETCH_FAIL,
  payload: errorMsg
});

export const startGainersLosersFetch = (limit) => ({
  type: SUMMARY_ACTION_TYPES.START_GAINERS_LOSERS_FETCH,
  payload: limit
});

export const gainersLosersFetchSuccess = (coins) => ({
  type: SUMMARY_ACTION_TYPES.GAINERS_LOSERS_FETCH_SUCCESS,
  payload: coins
});

export const gainersLosersFetchFail = (errorMsg) => ({
  type: SUMMARY_ACTION_TYPES.GAINERS_LOSERS_FETCH_FAIL,
  payload: errorMsg
});

export const startNewsSummaryFetch = (limit) => ({
  type: SUMMARY_ACTION_TYPES.NEWS_SUMMARY_FETCH,
  payload: limit
});

export const newsSummarySuccess = (news) => ({
  type: SUMMARY_ACTION_TYPES.NEWS_SUMMARY_SUCCESS,
  payload: news
});

export const newsSummaryFail = (errorMsg) => ({
  type: SUMMARY_ACTION_TYPES.NEWS_SUMMARY_FAIL,
  payload: errorMsg
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
  payload: errorMsg
});

export const updateTopCoins = (updatedCoins) => ({
  type: SUMMARY_ACTION_TYPES.UPDATE_TOP_COINS,
  payload: updatedCoins
});

export const updateGainersLosers = (updatedCoins) => ({
  type: SUMMARY_ACTION_TYPES.UPDATE_GAINERS_LOSERS,
  payload: updatedCoins
});
