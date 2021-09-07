import NEWS_ACTION_TYPES from "./news.action.types";

const INITIAL_STATE = {
  numLoadingReq: 2,
  news: [],
  events: []
};

const newsReducer = (prevState = INITIAL_STATE, action) => {
  switch (action.type) {
    case NEWS_ACTION_TYPES.START_NEWS_FETCH:
    case NEWS_ACTION_TYPES.START_EVENTS_FETCH:
      return {
        ...prevState,
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
    default:
      return prevState;
  }
};

export default newsReducer;
