import DISCOVER_ACTION_TYPES from "./discover.action.types";
import { NEWS_CONSTANTS } from "../../constants";

export const startNewsFetch = (filter = NEWS_CONSTANTS.DEFAULT_FILTER) => ({
  type: DISCOVER_ACTION_TYPES.INITIAL_NEWS_FETCH,
  payload: { filter }
});

export const initialNewsSuccess = (news) => ({
  type: DISCOVER_ACTION_TYPES.INITIAL_NEWS_SUCCESS,
  payload: news
});

export const initialNewsFail = (errorMsg) => ({
  type: DISCOVER_ACTION_TYPES.INITIAL_NEWS_FAIL,
  payload: errorMsg
});

export const startNextNewsFetch = (query) => ({
  type: DISCOVER_ACTION_TYPES.FETCH_MORE_NEWS,
  payload: query
});

export const moreNewsSuccess = (news) => ({
  type: DISCOVER_ACTION_TYPES.FETCH_MORE_NEWS_SUCCESS,
  payload: news
});

export const moreNewsFail = (errorMsg) => ({
  type: DISCOVER_ACTION_TYPES.FETCH_MORE_NEWS_FAIL,
  payload: errorMsg
});

export const startEventsFetch = () => ({
  type: DISCOVER_ACTION_TYPES.INITIAL_EVENTS_FETCH
});

export const initialEventsSuccess = (events) => ({
  type: DISCOVER_ACTION_TYPES.INITIAL_EVENTS_SUCCESS,
  payload: events
});

export const initialEventsFail = (errorMsg) => ({
  type: DISCOVER_ACTION_TYPES.INITIAL_EVENTS_FAIL,
  payload: errorMsg
});

export const startNextEventsFetch = (query) => ({
  type: DISCOVER_ACTION_TYPES.FETCH_MORE_EVENTS,
  payload: query
});

export const moreEventsSuccess = (events) => ({
  type: DISCOVER_ACTION_TYPES.FETCH_MORE_EVENTS_SUCCESS,
  payload: events
});

export const moreEventsFail = (errorMsg) => ({
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
