import NEWS_ACTION_TYPES from "./news.action.types";
import { LATEST_EVENTS_CONSTANTS } from "../../constants";

const INITIAL_STATE = {
  numLoadingReq: 2,
  news: [],
  events: [],
  eventFilters: {
    dateRange: {
      start: null,
      end: null
    },
    showOnly: LATEST_EVENTS_CONSTANTS.DEFAULT_SHOW_ONLY_FILTER_INDEX,
    limit: LATEST_EVENTS_CONSTANTS.NUM_TO_SHOW
  }
};

const newsReducer = (prevState = INITIAL_STATE, action) => {
  switch (action.type) {
    case NEWS_ACTION_TYPES.START_NEWS_FETCH:
      return {
        ...prevState,
        news: [],
        numLoadingReq: prevState.numLoadingReq + 1
      };
    case NEWS_ACTION_TYPES.START_EVENTS_FETCH:
      return {
        ...prevState,
        events: [],
        numLoadingReq: prevState.numLoadingReq + 1
      };
    case NEWS_ACTION_TYPES.NEWS_FETCH_SUCCESS:
      return {
        ...prevState,
        news: action.payload.data,
        numLoadingReq: prevState.numLoadingReq - 1
      };
    case NEWS_ACTION_TYPES.EVENTS_FETCH_SUCCESS:
      return {
        ...prevState,
        events: action.payload.data,
        numLoadingReq: prevState.numLoadingReq - 1
      };
    case NEWS_ACTION_TYPES.NEWS_FETCH_FAIL:
    case NEWS_ACTION_TYPES.EVENTS_FETCH_FAIL:
      return {
        ...prevState,
        numLoadingReq: prevState.numLoadingReq - 1
      };
    case NEWS_ACTION_TYPES.UPDATE_EVENT_FILTERS:
      return {
        ...prevState,
        eventFilters: {
          ...prevState.eventFilters,
          ...action.payload
        }
      };
    default:
      return prevState;
  }
};

export default newsReducer;
