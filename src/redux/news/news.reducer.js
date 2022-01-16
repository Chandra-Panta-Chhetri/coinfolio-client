import NEWS_ACTION_TYPES from "./news.action.types";
import { LATEST_EVENTS_CONSTANTS } from "../../constants";

const INITIAL_STATE = {
  news: [],
  events: [],
  eventFilters: {
    dateRange: {
      start: null,
      end: null
    },
    showOnly: LATEST_EVENTS_CONSTANTS.DEFAULT_SHOW_ONLY_FILTER_INDEX,
    limit: LATEST_EVENTS_CONSTANTS.NUM_TO_SHOW
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

const newsReducer = (prevState = INITIAL_STATE, action) => {
  switch (action.type) {
    case NEWS_ACTION_TYPES.START_INITIAL_NEWS_FETCH:
      return {
        ...prevState,
        news: [],
        isLoadingNews: true,
        hasMoreNews: true,
        newsPage: 1
      };
    case NEWS_ACTION_TYPES.START_EVENTS_FETCH:
      return {
        ...prevState,
        events: [],
        isLoadingEvents: true
      };
    case NEWS_ACTION_TYPES.INITIAL_NEWS_FETCH_SUCCESS:
      return {
        ...prevState,
        news: action.payload,
        isLoadingNews: false,
        newsPage: prevState.newsPage + 1
      };
    case NEWS_ACTION_TYPES.EVENTS_FETCH_SUCCESS:
      return {
        ...prevState,
        events: action.payload,
        isLoadingEvents: false
      };
    case NEWS_ACTION_TYPES.INITIAL_NEWS_FETCH_FAIL:
      return {
        ...prevState,
        isLoadingNews: false,
        hasMoreNews: false
      };
    case NEWS_ACTION_TYPES.EVENTS_FETCH_FAIL:
      return {
        ...prevState,
        isLoadingEvents: false
      };
    case NEWS_ACTION_TYPES.UPDATE_EVENT_FILTERS:
      return {
        ...prevState,
        eventFilters: {
          ...prevState.eventFilters,
          ...action.payload
        }
      };
    case NEWS_ACTION_TYPES.FETCH_MORE_NEWS:
      return {
        ...prevState,
        isLoadingMoreNews: true
      };
    case NEWS_ACTION_TYPES.FETCH_MORE_NEWS_FAIL:
      return {
        ...prevState,
        isLoadingMoreNews: false,
        hasMoreNews: false
      };
    case NEWS_ACTION_TYPES.FETCH_MORE_NEWS_SUCCESS:
      return {
        ...prevState,
        isLoadingMoreNews: false,
        news: action.payload,
        newsPage: prevState.newsPage + 1
      };
    default:
      return prevState;
  }
};

export default newsReducer;
