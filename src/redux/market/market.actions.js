import MARKET_ACTION_TYPES from "./market.action.types";

export const updateFilters = (newFilters = {}) => ({
  type: MARKET_ACTION_TYPES.UPDATE_FILTERS,
  payload: newFilters
});

export const startMarketsFetch = () => ({
  type: MARKET_ACTION_TYPES.START_MARKETS_FETCH
});

export const marketsFetchFail = () => ({
  type: MARKET_ACTION_TYPES.MARKETS_FETCH_FAIL,
  payload: { errorMsg: "Server issue while fetching market data" }
});

export const marketsFetchSuccess = (markets) => ({
  type: MARKET_ACTION_TYPES.MARKETS_FETCH_SUCCESS,
  payload: { markets }
});

export const noMoreMarkets = () => ({
  type: MARKET_ACTION_TYPES.NO_MORE_MARKETS
});
