import MARKET_ACTION_TYPES from "./market.action.types";
import MARKET_OVERVIEW_FILTERS from "../../screens/MarketOverview/filters";

const INITIAL_STATE = {
  markets: [],
  isLoadingMarkets: true,
  isLoadingMoreMarkets: false,
  perPage: 15,
  hasMoreMarkets: true,
  pageNum: 1,
  filters: {
    sortBy: MARKET_OVERVIEW_FILTERS.SORT_BY.DEFAULT_OPTION,
    sortOrder: MARKET_OVERVIEW_FILTERS.SORT_ORDER.DEFAULT_OPTION,
    showOnly: MARKET_OVERVIEW_FILTERS.SHOW_ONLY.DEFAULT_OPTION
  },
  trendingSearches: [],
  recentSearches: [],
  searchResults: [],
  isLoadingSearchResults: false,
  isLoadingTrendingSearches: true,
  isLoadingRecentSearches: true
};

const marketReducer = (prevState = INITIAL_STATE, action) => {
  switch (action?.type) {
    case MARKET_ACTION_TYPES.FETCH_MARKETS:
      return {
        ...prevState,
        isLoadingMarkets: true,
        markets: [],
        hasMoreMarkets: true,
        pageNum: 1,
        isLoadingMoreMarkets: false
      };
    case MARKET_ACTION_TYPES.FETCH_MARKETS_FAIL:
      return {
        ...prevState,
        isLoadingMarkets: false
      };
    case MARKET_ACTION_TYPES.NO_MORE_MARKETS:
      return {
        ...prevState,
        isLoadingMarkets: false,
        hasMoreMarkets: false,
        isLoadingMoreMarkets: false
      };
    case MARKET_ACTION_TYPES.FETCH_MARKETS_SUCCESS:
      return {
        ...prevState,
        markets: action?.payload,
        isLoadingMarkets: false,
        pageNum: prevState.pageNum + 1
      };
    case MARKET_ACTION_TYPES.UPDATE_FILTERS:
      return {
        ...prevState,
        filters: { ...prevState.filters, ...action?.payload },
        pageNum: 1,
        hasMoreMarkets: true,
        isLoadingMarkets: true,
        isLoadingMoreMarkets: false
      };
    case MARKET_ACTION_TYPES.FETCH_MORE_MARKETS:
      return {
        ...prevState,
        isLoadingMoreMarkets: true
      };
    case MARKET_ACTION_TYPES.FETCH_MORE_MARKETS_FAIL:
      return {
        ...prevState,
        isLoadingMoreMarkets: false
      };
    case MARKET_ACTION_TYPES.FETCH_MORE_MARKETS_SUCCESS:
      return {
        ...prevState,
        isLoadingMoreMarkets: false,
        markets: action?.payload,
        pageNum: prevState.pageNum + 1
      };
    case MARKET_ACTION_TYPES.FETCH_TRENDING_SEARCHES:
      return {
        ...prevState,
        isLoadingTrendingSearches: true
      };
    case MARKET_ACTION_TYPES.FETCH_TRENDING_SEARCHES_SUCCESS:
      return {
        ...prevState,
        trendingSearches: action?.payload,
        isLoadingTrendingSearches: false
      };
    case MARKET_ACTION_TYPES.FETCH_TRENDING_SEARCHES_FAIL:
      return {
        ...prevState,
        isLoadingTrendingSearches: false
      };
    case MARKET_ACTION_TYPES.FETCH_RECENT_SEARCHES:
      return {
        ...prevState,
        isLoadingRecentSearches: true
      };
    case MARKET_ACTION_TYPES.FETCH_RECENT_SEARCHES_FAIL:
      return {
        ...prevState,
        isLoadingRecentSearches: false
      };
    case MARKET_ACTION_TYPES.FETCH_RECENT_SEARCHES_SUCCESS:
      return {
        ...prevState,
        recentSearches: action?.payload,
        isLoadingRecentSearches: false
      };
    case MARKET_ACTION_TYPES.FETCH_SEARCH_RESULTS:
      return {
        ...prevState,
        isLoadingSearchResults: true
      };
    case MARKET_ACTION_TYPES.FETCH_SEARCH_RESULTS_FAIL:
      return {
        ...prevState,
        isLoadingSearchResults: false
      };
    case MARKET_ACTION_TYPES.FETCH_SEARCH_RESULTS_SUCCESS:
      return {
        ...prevState,
        searchResults: action?.payload,
        isLoadingSearchResults: false
      };
    case MARKET_ACTION_TYPES.UPDATE_MARKETS:
      return {
        ...prevState,
        markets: action?.payload
      };
    default:
      return prevState;
  }
};

export default marketReducer;
