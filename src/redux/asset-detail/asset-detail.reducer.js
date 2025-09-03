import EVENTS_FILTERS from "../../components/Events/filters";
import ASSET_DETAIL_ACTION_TYPES from "./asset-detail.action.types";

const INITIAL_STATE = {
  news: [],
  events: [],
  eventFilters: EVENTS_FILTERS.DEFAULT_ASSET_FILTERS,
  isLoadingNews: true,
  isLoadingEvents: true,
  isLoadingMoreNews: false,
  isLoadingMoreEvents: false,
  newsPage: 1,
  eventsPage: 1,
  hasMoreNews: true,
  hasMoreEvents: true,
  markets: [],
  isLoadingMarkets: true,
  overview: {},
  isLoadingOverview: true,
  about: {},
  isLoadingAbout: true
};

const assetDetailReducer = (prevState = INITIAL_STATE, action) => {
  switch (action?.type) {
    case ASSET_DETAIL_ACTION_TYPES.FETCH_ASSET_OVERVIEW:
      return {
        ...prevState,
        isLoadingOverview: true,
        overview: {}
      };
    case ASSET_DETAIL_ACTION_TYPES.FETCH_ASSET_OVERVIEW_FAIL:
      return {
        ...prevState,
        isLoadingOverview: false
      };
    case ASSET_DETAIL_ACTION_TYPES.FETCH_ASSET_OVERVIEW_SUCCESS:
      return {
        ...prevState,
        isLoadingOverview: false,
        overview: action?.payload
      };
    case ASSET_DETAIL_ACTION_TYPES.FETCH_ASSET_MARKETS:
      return {
        ...prevState,
        isLoadingMarkets: true,
        markets: []
      };
    case ASSET_DETAIL_ACTION_TYPES.FETCH_ASSET_MARKETS_FAIL:
      return {
        ...prevState,
        isLoadingMarkets: false
      };
    case ASSET_DETAIL_ACTION_TYPES.FETCH_ASSET_MARKETS_SUCCESS:
      return {
        ...prevState,
        isLoadingMarkets: false,
        markets: action?.payload
      };
    case ASSET_DETAIL_ACTION_TYPES.FETCH_ASSET_ABOUT:
      return {
        ...prevState,
        isLoadingAbout: true,
        about: {}
      };
    case ASSET_DETAIL_ACTION_TYPES.FETCH_ASSET_ABOUT_FAIL:
      return {
        ...prevState,
        isLoadingAbout: false
      };
    case ASSET_DETAIL_ACTION_TYPES.FETCH_ASSET_ABOUT_SUCCESS:
      return {
        ...prevState,
        isLoadingAbout: false,
        about: action?.payload
      };
    case ASSET_DETAIL_ACTION_TYPES.FETCH_ASSET_NEWS:
      return {
        ...prevState,
        news: [],
        isLoadingNews: true,
        hasMoreNews: true,
        newsPage: 1
      };
    case ASSET_DETAIL_ACTION_TYPES.FETCH_ASSET_EVENTS:
      return {
        ...prevState,
        events: [],
        isLoadingEvents: true,
        hasMoreEvents: true,
        eventsPage: 1
      };
    case ASSET_DETAIL_ACTION_TYPES.FETCH_ASSET_NEWS_FAIL:
      return {
        ...prevState,
        isLoadingNews: false
      };
    case ASSET_DETAIL_ACTION_TYPES.FETCH_ASSET_NEWS_SUCCESS:
      return {
        ...prevState,
        news: action?.payload,
        isLoadingNews: false,
        newsPage: prevState.newsPage + 1
      };
    case ASSET_DETAIL_ACTION_TYPES.FETCH_ASSET_EVENTS_FAIL:
      return {
        ...prevState,
        isLoadingEvents: false
      };
    case ASSET_DETAIL_ACTION_TYPES.FETCH_ASSET_EVENTS_SUCCESS:
      return {
        ...prevState,
        events: action?.payload,
        isLoadingEvents: false,
        eventsPage: prevState.eventsPage + 1
      };
    case ASSET_DETAIL_ACTION_TYPES.UPDATE_ASSET_EVENT_FILTERS:
      return {
        ...prevState,
        eventFilters: {
          ...prevState.eventFilters,
          ...action?.payload
        }
      };
    case ASSET_DETAIL_ACTION_TYPES.FETCH_MORE_ASSET_NEWS:
      return {
        ...prevState,
        isLoadingMoreNews: true
      };
    case ASSET_DETAIL_ACTION_TYPES.FETCH_MORE_ASSET_NEWS_FAIL:
      return {
        ...prevState,
        isLoadingMoreNews: false
      };
    case ASSET_DETAIL_ACTION_TYPES.FETCH_MORE_ASSET_NEWS_SUCCESS:
      return {
        ...prevState,
        isLoadingMoreNews: false,
        news: action?.payload,
        newsPage: prevState.newsPage + 1
      };
    case ASSET_DETAIL_ACTION_TYPES.FETCH_MORE_ASSET_EVENTS:
      return {
        ...prevState,
        isLoadingMoreEvents: true
      };
    case ASSET_DETAIL_ACTION_TYPES.FETCH_MORE_ASSET_EVENTS_FAIL:
      return {
        ...prevState,
        isLoadingMoreEvents: false
      };
    case ASSET_DETAIL_ACTION_TYPES.FETCH_MORE_ASSET_EVENTS_SUCCESS:
      return {
        ...prevState,
        isLoadingMoreEvents: false,
        events: action?.payload,
        eventsPage: prevState.eventsPage + 1
      };
    case ASSET_DETAIL_ACTION_TYPES.NO_MORE_ASSET_NEWS:
      return {
        ...prevState,
        isLoadingMoreNews: false,
        hasMoreNews: false,
        isLoadingNews: false
      };
    case ASSET_DETAIL_ACTION_TYPES.NO_MORE_ASSET_EVENTS:
      return {
        ...prevState,
        isLoadingMoreEvents: false,
        hasMoreEvents: false,
        isLoadingEvents: false
      };
    case ASSET_DETAIL_ACTION_TYPES.UPDATE_ASSET_OVERVIEW:
      return {
        ...prevState,
        overview: {
          ...prevState.overview,
          ...action?.payload
        }
      };
    default:
      return prevState;
  }
};

export default assetDetailReducer;
