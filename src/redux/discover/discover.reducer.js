import DISCOVER_ACTION_TYPES from "./discover.action.types";
import { EVENTS_CONSTANTS } from "../../constants";

const INITIAL_STATE = {
  news: [],
  events: [],
  eventFilters: {
    dateRange: {
      start: null,
      end: null
    },
    showOnly: EVENTS_CONSTANTS.DEFAULT_SHOW_ONLY_FILTER_INDEX,
    limit: EVENTS_CONSTANTS.NUM_TO_SHOW
  },
  isLoadingNews: true,
  isLoadingEvents: true,
  isLoadingMoreNews: false,
  isLoadingMoreEvents: false,
  newsPage: 1,
  eventsPage: 1,
  hasMoreNews: true,
  hasMoreEvents: true
};

const discoverReducer = (prevState = INITIAL_STATE, action) => {
  switch (action.type) {
    case DISCOVER_ACTION_TYPES.INITIAL_NEWS_FETCH:
      return {
        ...prevState,
        news: [],
        isLoadingNews: true,
        hasMoreNews: true,
        newsPage: 1
      };
    case DISCOVER_ACTION_TYPES.START_EVENTS_FETCH:
      return {
        ...prevState,
        events: [],
        isLoadingEvents: true
      };
    case DISCOVER_ACTION_TYPES.INITIAL_NEWS_SUCCESS:
      return {
        ...prevState,
        news: action.payload,
        isLoadingNews: false,
        newsPage: prevState.newsPage + 1
      };
    case DISCOVER_ACTION_TYPES.EVENTS_FETCH_SUCCESS:
      return {
        ...prevState,
        events: action.payload,
        isLoadingEvents: false
      };
    case DISCOVER_ACTION_TYPES.INITIAL_NEWS_FAIL:
      return {
        ...prevState,
        isLoadingNews: false,
        hasMoreNews: false
      };
    case DISCOVER_ACTION_TYPES.EVENTS_FETCH_FAIL:
      return {
        ...prevState,
        isLoadingEvents: false
      };
    case DISCOVER_ACTION_TYPES.UPDATE_EVENT_FILTERS:
      return {
        ...prevState,
        eventFilters: {
          ...prevState.eventFilters,
          ...action.payload
        }
      };
    case DISCOVER_ACTION_TYPES.FETCH_MORE_NEWS:
      return {
        ...prevState,
        isLoadingMoreNews: true
      };
    case DISCOVER_ACTION_TYPES.FETCH_MORE_NEWS_FAIL:
      return {
        ...prevState,
        isLoadingMoreNews: false,
        hasMoreNews: false
      };
    case DISCOVER_ACTION_TYPES.FETCH_MORE_NEWS_SUCCESS:
      return {
        ...prevState,
        isLoadingMoreNews: false,
        news: action.payload,
        newsPage: prevState.newsPage + 1
      };
    case DISCOVER_ACTION_TYPES.NO_MORE_NEWS:
      return {
        ...prevState,
        isLoadingMoreNews: false,
        hasMoreNews: false
      };
    default:
      return prevState;
  }
};

export default discoverReducer;
