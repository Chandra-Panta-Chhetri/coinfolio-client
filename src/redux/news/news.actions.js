import NEWS_ACTION_TYPES from "./news.action.types";
import {
  LATEST_NEWS_CONSTANTS,
  LATEST_EVENTS_CONSTANTS
} from "../../constants";

export const startNewsFetch = (
  filter = LATEST_NEWS_CONSTANTS.DEFAULT_FILTER
) => ({
  type: NEWS_ACTION_TYPES.START_NEWS_FETCH,
  payload: { limit: LATEST_NEWS_CONSTANTS.NUM_TO_SHOW, filter }
});

export const newsFetchSuccess = (data) => ({
  type: NEWS_ACTION_TYPES.NEWS_FETCH_SUCCESS,
  payload: { data }
});

export const newsFetchFail = (errorMsg) => ({
  type: NEWS_ACTION_TYPES.NEWS_FETCH_FAIL,
  payload: { errorMsg }
});

export const startEventsFetch = () => ({
  type: NEWS_ACTION_TYPES.START_EVENTS_FETCH
});

export const eventsFetchSuccess = (data) => ({
  type: NEWS_ACTION_TYPES.EVENTS_FETCH_SUCCESS,
  payload: { data }
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
