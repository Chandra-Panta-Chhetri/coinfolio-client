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

export const startTrendingSearchesFetch = () => ({
  type: MARKET_ACTION_TYPES.FETCH_TRENDING_SEARCHES
});

export const trendingSearchesFail = (errorMsg) => ({
  type: MARKET_ACTION_TYPES.FETCH_TRENDING_FAIL,
  payload: errorMsg
});

export const trendingSearchesSuccess = (searches) => ({
  type: MARKET_ACTION_TYPES.FETCH_TRENDING_SUCCESS,
  payload: searches
});

export const startRecentSearchesFetch = () => ({
  type: MARKET_ACTION_TYPES.FETCH_RECENT_SEARCHES
});

export const recentSearchesFail = (errorMsg) => ({
  type: MARKET_ACTION_TYPES.FETCH_RECENT_SEARCHES_FAIL,
  payload: errorMsg
});

export const recentSearchesSuccess = (searches) => ({
  type: MARKET_ACTION_TYPES.FETCH_RECENT_SEARCHES_SUCCESS,
  payload: searches
});

export const startSearchResultsFetch = (keyword) => ({
  type: MARKET_ACTION_TYPES.FETCH_SEARCH_RESULTS,
  payload: keyword
});

export const searchResultsFail = (errorMsg) => ({
  type: MARKET_ACTION_TYPES.FETCH_SEARCH_RESULTS_FAIL,
  payload: errorMsg
});

export const searchResultsSuccess = (searches) => ({
  type: MARKET_ACTION_TYPES.FETCH_SEARCH_RESULTS_SUCCESS,
  payload: searches
});
