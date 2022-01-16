import NEWS_ACTION_TYPES from "./news.action.types";
import { LATEST_NEWS_CONSTANTS, LATEST_EVENTS_CONSTANTS } from "../../constants";

export const startNewsFetch = (filter = LATEST_NEWS_CONSTANTS.DEFAULT_FILTER) => ({
  type: NEWS_ACTION_TYPES.START_INITIAL_NEWS_FETCH,
  payload: { filter }
});

export const newsFetchSuccess = (news) => ({
  type: NEWS_ACTION_TYPES.INITIAL_NEWS_FETCH_SUCCESS,
  payload: news
});

export const newsFetchFail = (errorMsg) => ({
  type: NEWS_ACTION_TYPES.INITIAL_NEWS_FETCH_FAIL,
  payload: { errorMsg }
});

export const startNextNewsFetch = (query) => ({
  type: NEWS_ACTION_TYPES.FETCH_MORE_NEWS,
  payload: query
});

export const nextNewsFetchSuccess = (news) => ({
  type: NEWS_ACTION_TYPES.FETCH_MORE_NEWS_SUCCESS,
  payload: news
});

export const nextNewsFetchFail = (errorMsg) => ({
  type: NEWS_ACTION_TYPES.FETCH_MORE_NEWS_FAIL,
  payload: { errorMsg }
});

export const startEventsFetch = () => ({
  type: NEWS_ACTION_TYPES.START_EVENTS_FETCH
});

export const eventsFetchSuccess = (events) => ({
  type: NEWS_ACTION_TYPES.EVENTS_FETCH_SUCCESS,
  payload: events
});

export const eventsFetchFail = (errorMsg) => ({
  type: NEWS_ACTION_TYPES.EVENTS_FETCH_FAIL,
  payload: { errorMsg }
});

export const updateEventFilters = (filters) => ({
  type: NEWS_ACTION_TYPES.UPDATE_EVENT_FILTERS,
  payload: filters
});

export const resetEventFilters = () =>
  updateEventFilters({
    dateRange: {
      start: null,
      end: null
    },
    showOnly: LATEST_EVENTS_CONSTANTS.DEFAULT_SHOW_ONLY_FILTER_INDEX,
    limit: LATEST_EVENTS_CONSTANTS.NUM_TO_SHOW
  });
