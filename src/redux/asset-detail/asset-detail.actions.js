import ASSET_DETAIL_ACTION_TYPES from "./asset-detail.action.types";

export const fetchAssetOverview = (id) => ({
  type: ASSET_DETAIL_ACTION_TYPES.FETCH_ASSET_OVERVIEW,
  payload: id
});

export const fetchAssetOverviewFail = (errorMsg) => ({
  type: ASSET_DETAIL_ACTION_TYPES.FETCH_ASSET_OVERVIEW_FAIL,
  payload: errorMsg
});

export const fetchAssetOverviewSuccess = (overview) => ({
  type: ASSET_DETAIL_ACTION_TYPES.FETCH_ASSET_OVERVIEW_SUCCESS,
  payload: overview
});

export const fetchAssetMarkets = (id, query) => ({
  type: ASSET_DETAIL_ACTION_TYPES.FETCH_ASSET_MARKETS,
  payload: { id, query }
});

export const fetchAssetMarketsFail = (errorMsg) => ({
  type: ASSET_DETAIL_ACTION_TYPES.FETCH_ASSET_MARKETS_FAIL,
  payload: errorMsg
});

export const fetchAssetMarketsSuccess = (markets) => ({
  type: ASSET_DETAIL_ACTION_TYPES.FETCH_ASSET_MARKETS_SUCCESS,
  payload: markets
});

export const fetchAssetAbout = (id) => ({
  type: ASSET_DETAIL_ACTION_TYPES.FETCH_ASSET_ABOUT,
  payload: id
});

export const fetchAssetAboutFail = (errorMsg) => ({
  type: ASSET_DETAIL_ACTION_TYPES.FETCH_ASSET_ABOUT_FAIL,
  payload: errorMsg
});

export const fetchAssetAboutSuccess = (about) => ({
  type: ASSET_DETAIL_ACTION_TYPES.FETCH_ASSET_ABOUT_SUCCESS,
  payload: about
});

export const fetchAssetNews = (query) => ({
  type: ASSET_DETAIL_ACTION_TYPES.FETCH_ASSET_NEWS,
  payload: query
});

export const fetchAssetNewsSuccess = (news) => ({
  type: ASSET_DETAIL_ACTION_TYPES.FETCH_ASSET_NEWS_SUCCESS,
  payload: news
});

export const fetchAssetNewsFail = (errorMsg) => ({
  type: ASSET_DETAIL_ACTION_TYPES.FETCH_ASSET_NEWS_FAIL,
  payload: errorMsg
});

export const fetchMoreAssetNews = (query) => ({
  type: ASSET_DETAIL_ACTION_TYPES.FETCH_MORE_ASSET_NEWS,
  payload: query
});

export const fetchMoreAssetNewsSuccess = (news) => ({
  type: ASSET_DETAIL_ACTION_TYPES.FETCH_MORE_ASSET_NEWS_SUCCESS,
  payload: news
});

export const fetchMoreAssetNewsFail = (errorMsg) => ({
  type: ASSET_DETAIL_ACTION_TYPES.FETCH_MORE_ASSET_NEWS_FAIL,
  payload: errorMsg
});

export const fetchAssetEvents = (query = {}) => ({
  type: ASSET_DETAIL_ACTION_TYPES.FETCH_ASSET_EVENTS,
  payload: query
});

export const fetchAssetEventsSuccess = (events) => ({
  type: ASSET_DETAIL_ACTION_TYPES.FETCH_ASSET_EVENTS_SUCCESS,
  payload: events
});

export const fetchAssetEventsFail = (errorMsg) => ({
  type: ASSET_DETAIL_ACTION_TYPES.FETCH_ASSET_EVENTS_FAIL,
  payload: errorMsg
});

export const fetchMoreAssetEvents = (query = {}) => ({
  type: ASSET_DETAIL_ACTION_TYPES.FETCH_MORE_ASSET_EVENTS,
  payload: query
});

export const fetchMoreAssetEventsSuccess = (events) => ({
  type: ASSET_DETAIL_ACTION_TYPES.FETCH_MORE_ASSET_NEWS_SUCCESS,
  payload: events
});

export const fetchMoreAssetEventsFail = (errorMsg) => ({
  type: ASSET_DETAIL_ACTION_TYPES.FETCH_MORE_ASSET_NEWS_FAIL,
  payload: errorMsg
});

export const updateAssetEventFilters = (filters) => ({
  type: ASSET_DETAIL_ACTION_TYPES.UPDATE_ASSET_EVENT_FILTERS,
  payload: filters
});

export const noMoreAssetNews = () => ({
  type: ASSET_DETAIL_ACTION_TYPES.NO_MORE_ASSET_NEWS
});

export const noMoreAssetEvents = () => ({
  type: ASSET_DETAIL_ACTION_TYPES.NO_MORE_ASSET_EVENTS
});

export const updateAssetOverview = (overviewUpdates = {}) => ({
  type: ASSET_DETAIL_ACTION_TYPES.UPDATE_ASSET_OVERVIEW,
  payload: overviewUpdates
});
