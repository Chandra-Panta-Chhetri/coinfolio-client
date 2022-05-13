import MARKET_ACTION_TYPES from "./market.action.types";

export const updateFilters = (newFilters) => ({
  type: MARKET_ACTION_TYPES.UPDATE_FILTERS,
  payload: newFilters
});

export const startMarketsFetch = () => ({
  type: MARKET_ACTION_TYPES.INITIAL_MARKETS_FETCH
});

export const marketsFetchFail = (errorMsg) => ({
  type: MARKET_ACTION_TYPES.INITIAL_MARKETS_FAIL,
  payload: errorMsg
});

export const marketsFetchSuccess = (markets) => ({
  type: MARKET_ACTION_TYPES.INITIAL_MARKETS_SUCCESS,
  payload: markets
});

export const startNextMarketsFetch = () => ({
  type: MARKET_ACTION_TYPES.FETCH_MORE_MARKETS
});

export const moreMarketsFail = (errorMsg) => ({
  type: MARKET_ACTION_TYPES.FETCH_MORE_MARKETS_FAIL,
  payload: errorMsg
});

export const moreMarketsSuccess = (markets) => ({
  type: MARKET_ACTION_TYPES.FETCH_MORE_MARKETS_SUCCESS,
  payload: markets
});

export const noMoreMarkets = () => ({
  type: MARKET_ACTION_TYPES.NO_MORE_MARKETS
});
