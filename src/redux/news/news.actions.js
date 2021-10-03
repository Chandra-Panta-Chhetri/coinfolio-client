import NEWS_ACTION_TYPES from "./news.action.types";
import CONSTANTS from "../../Constants";

export const startNewsFetch = (
  filter = CONSTANTS.LATEST_NEWS.FILTERS[
    CONSTANTS.LATEST_NEWS.DEFAULT_FILTER_INDEX
  ].value
) => ({
  type: NEWS_ACTION_TYPES.START_NEWS_FETCH,
  payload: { limit: CONSTANTS.LATEST_NEWS.NUM_NEWS_ITEMS_TO_SHOW, filter }
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
    dateRange: null,
    showOnly: CONSTANTS.LATEST_EVENTS.DEFAULT_SHOW_ONLY_FILTER_INDEX,
    limit: CONSTANTS.LATEST_EVENTS.NUM_EVENTS_TO_SHOW
  });
