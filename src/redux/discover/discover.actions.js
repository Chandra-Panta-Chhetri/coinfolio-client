import NEWS_FILTERS from "../../components/News/filters";
import DISCOVER_ACTION_TYPES from "./discover.action.types";

export const fetchNews = (filter = NEWS_FILTERS.SHOW_ONLY.DEFAULT_OPTION) => ({
  type: DISCOVER_ACTION_TYPES.FETCH_NEWS,
  payload: { filter }
});

export const fetchNewsSuccess = (news) => ({
  type: DISCOVER_ACTION_TYPES.FETCH_NEWS_SUCCESS,
  payload: news
});

export const fetchNewsFail = (errorMsg) => ({
  type: DISCOVER_ACTION_TYPES.FETCH_NEWS_FAIL,
  payload: errorMsg
});

export const fetchMoreNews = (query) => ({
  type: DISCOVER_ACTION_TYPES.FETCH_MORE_NEWS,
  payload: query
});

export const fetchMoreNewsSuccess = (news) => ({
  type: DISCOVER_ACTION_TYPES.FETCH_MORE_NEWS_SUCCESS,
  payload: news
});

export const fetchMoreNewsFail = (errorMsg) => ({
  type: DISCOVER_ACTION_TYPES.FETCH_MORE_NEWS_FAIL,
  payload: errorMsg
});

export const fetchEvents = () => ({
  type: DISCOVER_ACTION_TYPES.FETCH_EVENTS
});

export const fetchEventsSuccess = (events) => ({
  type: DISCOVER_ACTION_TYPES.FETCH_EVENTS_SUCCESS,
  payload: events
});

export const fetchEventsFail = (errorMsg) => ({
  type: DISCOVER_ACTION_TYPES.FETCH_EVENTS_FAIL,
  payload: errorMsg
});

export const fetchMoreEvents = (query) => ({
  type: DISCOVER_ACTION_TYPES.FETCH_MORE_EVENTS,
  payload: query
});

export const fetchMoreEventsSuccess = (events) => ({
  type: DISCOVER_ACTION_TYPES.FETCH_MORE_EVENTS_SUCCESS,
  payload: events
});

export const fetchMoreEventsFail = (errorMsg) => ({
  type: DISCOVER_ACTION_TYPES.FETCH_MORE_EVENTS_FAIL,
  payload: errorMsg
});

export const updateEventFilters = (filters) => ({
  type: DISCOVER_ACTION_TYPES.UPDATE_EVENT_FILTERS,
  payload: filters
});

export const noMoreNews = () => ({
  type: DISCOVER_ACTION_TYPES.NO_MORE_NEWS
});

export const noMoreEvents = () => ({
  type: DISCOVER_ACTION_TYPES.NO_MORE_EVENTS
});
