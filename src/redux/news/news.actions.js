import NEWS_ACTION_TYPES from "./news.action.types";

export const startNewsFetch = (limit = 0, filter = "") => ({
  type: NEWS_ACTION_TYPES.START_NEWS_FETCH,
  payload: { limit, filter }
});

export const newsFetchSuccess = (data) => ({
  type: NEWS_ACTION_TYPES.NEWS_FETCH_SUCCESS,
  payload: { data }
});

export const newsFetchFail = (errorMsg) => ({
  type: NEWS_ACTION_TYPES.NEWS_FETCH_FAIL,
  payload: { errorMsg }
});

export const startEventsFetch = (limit = 0, filter = "") => ({
  type: NEWS_ACTION_TYPES.START_EVENTS_FETCH,
  payload: { limit, filter }
});

export const eventsFetchSuccess = (data) => ({
  type: NEWS_ACTION_TYPES.EVENTS_FETCH_SUCCESS,
  payload: { data }
});

export const eventsFetchFail = (errorMsg) => ({
  type: NEWS_ACTION_TYPES.EVENTS_FETCH_FAIL,
  payload: { errorMsg }
});
