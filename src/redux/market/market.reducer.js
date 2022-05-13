import MARKET_ACTION_TYPES from "./market.action.types";
import { MARKET_OVERVIEW_CONSTANTS } from "../../constants";

const INITIAL_STATE = {
  markets: [],
  isLoadingMarkets: true,
  isLoadingMoreMarkets: false,
  perPage: 15,
  hasMoreMarkets: true,
  pageNum: 1,
  filters: {
    sortBy: MARKET_OVERVIEW_CONSTANTS.SORT_BY.DEFAULT_FILTER,
    sortOrder: MARKET_OVERVIEW_CONSTANTS.SORT_ORDER.DEFAULT_FILTER,
    showOnly: MARKET_OVERVIEW_CONSTANTS.SHOW_ONLY.DEFAULT_FILTER
  }
};

const marketReducer = (prevState = INITIAL_STATE, action) => {
  switch (action.type) {
    case MARKET_ACTION_TYPES.INITIAL_MARKETS_FETCH:
      return {
        ...prevState,
        isLoadingMarkets: true,
        markets: [],
        hasMoreMarkets: true,
        pageNum: 1,
        isLoadingMoreMarkets: false
      };
    case MARKET_ACTION_TYPES.INITIAL_MARKETS_FAIL:
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
    case MARKET_ACTION_TYPES.INITIAL_MARKETS_SUCCESS:
      return {
        ...prevState,
        markets: action.payload,
        isLoadingMarkets: false,
        pageNum: prevState.pageNum + 1
      };
    case MARKET_ACTION_TYPES.UPDATE_FILTERS:
      return {
        ...prevState,
        filters: { ...prevState.filters, ...action.payload },
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
        markets: action.payload,
        pageNum: prevState.pageNum + 1
      };
    default:
      return prevState;
  }
};

export default marketReducer;
