import DISCOVER_ACTION_TYPES from "./discover.action.types";
import { EVENTS_CONSTANTS } from "../../constants";

const INITIAL_STATE = {
  news: [],
  events: [],
  eventFilters: EVENTS_CONSTANTS.DEFAULT_FILTERS,
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
    case DISCOVER_ACTION_TYPES.INITIAL_EVENTS_FETCH:
      return {
        ...prevState,
        events: [],
        isLoadingEvents: true,
        hasMoreEvents: true,
        eventsPage: 1
      };
    case DISCOVER_ACTION_TYPES.INITIAL_NEWS_FAIL:
      return {
        ...prevState,
        isLoadingNews: false
      };
    case DISCOVER_ACTION_TYPES.INITIAL_NEWS_SUCCESS:
      return {
        ...prevState,
        news: action.payload,
        isLoadingNews: false,
        newsPage: prevState.newsPage + 1
      };
    case DISCOVER_ACTION_TYPES.INITIAL_EVENTS_FAIL:
      return {
        ...prevState,
        isLoadingEvents: false
      };
    case DISCOVER_ACTION_TYPES.INITIAL_EVENTS_SUCCESS:
      return {
        ...prevState,
        events: action.payload,
        isLoadingEvents: false,
        eventsPage: prevState.eventsPage + 1
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
        isLoadingMoreNews: false
      };
    case DISCOVER_ACTION_TYPES.FETCH_MORE_NEWS_SUCCESS:
      return {
        ...prevState,
        isLoadingMoreNews: false,
        news: action.payload,
        newsPage: prevState.newsPage + 1
      };
    case DISCOVER_ACTION_TYPES.FETCH_MORE_EVENTS:
      return {
        ...prevState,
        isLoadingMoreEvents: true
      };
    case DISCOVER_ACTION_TYPES.FETCH_MORE_EVENTS_FAIL:
      return {
        ...prevState,
        isLoadingMoreEvents: false
      };
    case DISCOVER_ACTION_TYPES.FETCH_MORE_EVENTS_SUCCESS:
      return {
        ...prevState,
        isLoadingMoreEvents: false,
        events: action.payload,
        eventsPage: prevState.eventsPage + 1
      };
    case DISCOVER_ACTION_TYPES.NO_MORE_NEWS:
      return {
        ...prevState,
        isLoadingMoreNews: false,
        hasMoreNews: false,
        isLoadingNews: false
      };
    case DISCOVER_ACTION_TYPES.NO_MORE_EVENTS:
      return {
        ...prevState,
        isLoadingMoreEvents: false,
        hasMoreEvents: false,
        isLoadingEvents: false
      };
    default:
      return prevState;
  }
};

export default discoverReducer;
