import MARKET_ACTION_TYPES from "./market.action.types";

export const updateFilters = (newFilters) => ({
  type: MARKET_ACTION_TYPES.UPDATE_FILTERS,
  payload: newFilters
});

export const fetchMarkets = () => ({
  type: MARKET_ACTION_TYPES.FETCH_MARKETS
});

export const fetchMarketsFail = (errorMsg) => ({
  type: MARKET_ACTION_TYPES.FETCH_MARKETS_FAIL,
  payload: errorMsg
});

export const fetchMarketsSuccess = (markets) => ({
  type: MARKET_ACTION_TYPES.FETCH_MARKETS_SUCCESS,
  payload: markets
});

export const fetchMoreMarkets = () => ({
  type: MARKET_ACTION_TYPES.FETCH_MORE_MARKETS
});

export const fetchMoreMarketsFail = (errorMsg) => ({
  type: MARKET_ACTION_TYPES.FETCH_MORE_MARKETS_FAIL,
  payload: errorMsg
});

export const fetchMoreMarketsSuccess = (markets) => ({
  type: MARKET_ACTION_TYPES.FETCH_MORE_MARKETS_SUCCESS,
  payload: markets
});

export const noMoreMarkets = () => ({
  type: MARKET_ACTION_TYPES.NO_MORE_MARKETS
});

export const fetchTrendingSearches = () => ({
  type: MARKET_ACTION_TYPES.FETCH_TRENDING_SEARCHES
});

export const fetchTrendingSearchesFail = (errorMsg) => ({
  type: MARKET_ACTION_TYPES.FETCH_TRENDING_SEARCHES_FAIL,
  payload: errorMsg
});

export const fetchTrendingSearchesSuccess = (searches) => ({
  type: MARKET_ACTION_TYPES.FETCH_TRENDING_SEARCHES_SUCCESS,
  payload: searches
});

export const fetchRecentSearches = () => ({
  type: MARKET_ACTION_TYPES.FETCH_RECENT_SEARCHES
});

export const fetchRecentSearchesFail = (errorMsg) => ({
  type: MARKET_ACTION_TYPES.FETCH_RECENT_SEARCHES_FAIL,
  payload: errorMsg
});

export const fetchRecentSearchesSuccess = (searches) => ({
  type: MARKET_ACTION_TYPES.FETCH_RECENT_SEARCHES_SUCCESS,
  payload: searches
});

export const fetchSearchResults = (keyword) => ({
  type: MARKET_ACTION_TYPES.FETCH_SEARCH_RESULTS,
  payload: keyword
});

export const fetchSearchResultsFail = (errorMsg) => ({
  type: MARKET_ACTION_TYPES.FETCH_SEARCH_RESULTS_FAIL,
  payload: errorMsg
});

export const fetchSearchResultsSuccess = (searches) => ({
  type: MARKET_ACTION_TYPES.FETCH_SEARCH_RESULTS_SUCCESS,
  payload: searches
});

export const updateMarkets = (markets) => ({
  type: MARKET_ACTION_TYPES.UPDATE_MARKETS,
  payload: markets
});
