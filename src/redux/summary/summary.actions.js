import SUMMARY_ACTION_TYPES from "./summary.action.types";

export const fetchTopCoins = (limit) => ({
  type: SUMMARY_ACTION_TYPES.FETCH_TOP_COINS,
  payload: limit
});

export const fetchTopCoinsSuccess = (coins) => ({
  type: SUMMARY_ACTION_TYPES.FETCH_TOP_COINS_SUCCESS,
  payload: coins
});

export const fetchTopCoinsFail = (errorMsg) => ({
  type: SUMMARY_ACTION_TYPES.FETCH_TOP_COINS_FAIL,
  payload: errorMsg
});

export const fetchGainersLosers = (limit) => ({
  type: SUMMARY_ACTION_TYPES.FETCH_GAINERS_LOSERS,
  payload: limit
});

export const fetchGainersLosersSuccess = (coins) => ({
  type: SUMMARY_ACTION_TYPES.FETCH_GAINERS_LOSERS_SUCCESS,
  payload: coins
});

export const fetchGainersLosersFail = (errorMsg) => ({
  type: SUMMARY_ACTION_TYPES.FETCH_GAINERS_LOSERS_FAIL,
  payload: errorMsg
});

export const fetchNewsSummary = (limit) => ({
  type: SUMMARY_ACTION_TYPES.FETCH_NEWS_SUMMARY,
  payload: limit
});

export const fetchNewsSummarySuccess = (news) => ({
  type: SUMMARY_ACTION_TYPES.FETCH_NEWS_SUMMARY_SUCCESS,
  payload: news
});

export const fetchNewsSummaryFail = (errorMsg) => ({
  type: SUMMARY_ACTION_TYPES.FETCH_NEWS_SUMMARY_FAIL,
  payload: errorMsg
});

export const fetchGlobalSummary = () => ({
  type: SUMMARY_ACTION_TYPES.FETCH_GLOBAL_SUMMARY
});

export const fetchGlobalSummarySuccess = (summary) => ({
  type: SUMMARY_ACTION_TYPES.FETCH_GLOBAL_SUMMARY_SUCCESS,
  payload: summary
});

export const fetchGlobalSummaryFail = (errorMsg) => ({
  type: SUMMARY_ACTION_TYPES.FETCH_GLOBAL_SUMMARY_FAIL,
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
