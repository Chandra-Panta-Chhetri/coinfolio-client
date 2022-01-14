import MARKET_ACTION_TYPES from "./market.action.types";
import { MARKET_OVERVIEW_CONSTANTS } from "../../constants";

const INITIAL_STATE = {
  markets: [],
  isFetchingMarkets: false,
  perPage: 15,
  hasMoreMarkets: true,
  pageNum: 1,
  filters: {
    sortBy: MARKET_OVERVIEW_CONSTANTS.SORT_BY.DEFAULT_FILTER,
    sortOrder: MARKET_OVERVIEW_CONSTANTS.SORT_ORDER.DEFAULT_FILTER,
    limit: MARKET_OVERVIEW_CONSTANTS.LIMIT.DEFAULT_FILTER,
    showOnly: MARKET_OVERVIEW_CONSTANTS.SHOW_ONLY.DEFAULT_FILTER
  }
};

const marketReducer = (prevState = INITIAL_STATE, action) => {
  switch (action.type) {
    case MARKET_ACTION_TYPES.START_MARKETS_FETCH:
      return {
        ...prevState,
        isFetchingMarkets: true
      };
    case MARKET_ACTION_TYPES.MARKETS_FETCH_FAIL:
    case MARKET_ACTION_TYPES.NO_MORE_MARKETS:
      return {
        ...prevState,
        isFetchingMarkets: false,
        hasMoreMarkets: false
      };
    case MARKET_ACTION_TYPES.MARKETS_FETCH_SUCCESS:
      return {
        ...prevState,
        ...action.payload,
        isFetchingMarkets: false,
        pageNum: prevState.pageNum + 1
      };
    case MARKET_ACTION_TYPES.UPDATE_FILTERS:
      return {
        ...prevState,
        filters: { ...prevState.filters, ...action.payload },
        pageNum: 1,
        hasMoreMarkets: true,
        isFetchingMarkets: true
      };
    default:
      return prevState;
  }
};

export default marketReducer;
