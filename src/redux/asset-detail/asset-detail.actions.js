import ASSET_DETAIL_ACTION_TYPES from "./asset-detail.action.types";
import { NEWS_CONSTANTS } from "../../constants";

export const startAssetOverviewFetch = (id) => ({
  type: ASSET_DETAIL_ACTION_TYPES.FETCH_ASSET_OVERVIEW,
  payload: id
});

export const assetOverviewFail = (errorMsg) => ({
  type: ASSET_DETAIL_ACTION_TYPES.ASSET_OVERVIEW_FAIL,
  payload: errorMsg
});

export const assetOverviewSuccess = (overview) => ({
  type: ASSET_DETAIL_ACTION_TYPES.ASSET_OVERVIEW_SUCCESS,
  payload: overview
});

export const startAssetMarketsFetch = (id, query) => ({
  type: ASSET_DETAIL_ACTION_TYPES.FETCH_ASSET_MARKETS,
  payload: { id, query }
});

export const assetMarketsFail = (errorMsg) => ({
  type: ASSET_DETAIL_ACTION_TYPES.ASSET_MARKETS_FAIL,
  payload: errorMsg
});

export const assetMarketsSuccess = (markets) => ({
  type: ASSET_DETAIL_ACTION_TYPES.ASSET_MARKETS_SUCCESS,
  payload: markets
});

export const startAssetAboutFetch = (id) => ({
  type: ASSET_DETAIL_ACTION_TYPES.FETCH_ASSET_ABOUT,
  payload: id
});

export const assetAboutFail = (errorMsg) => ({
  type: ASSET_DETAIL_ACTION_TYPES.ASSET_ABOUT_FAIL,
  payload: errorMsg
});

export const assetAboutSuccess = (about) => ({
  type: ASSET_DETAIL_ACTION_TYPES.ASSET_ABOUT_SUCCESS,
  payload: about
});

export const startAssetNewsFetch = (query) => ({
  type: ASSET_DETAIL_ACTION_TYPES.INITIAL_ASSET_NEWS_FETCH,
  payload: query
});

export const initialAssetNewsSuccess = (news) => ({
  type: ASSET_DETAIL_ACTION_TYPES.INITIAL_ASSET_NEWS_SUCCESS,
  payload: news
});

export const initialAssetNewsFail = (errorMsg) => ({
  type: ASSET_DETAIL_ACTION_TYPES.INITIAL_ASSET_NEWS_FAIL,
  payload: errorMsg
});

export const startNextAssetNewsFetch = (query) => ({
  type: ASSET_DETAIL_ACTION_TYPES.FETCH_MORE_ASSET_NEWS,
  payload: query
});

export const moreAssetNewsSuccess = (news) => ({
  type: ASSET_DETAIL_ACTION_TYPES.MORE_ASSET_NEWS_SUCCESS,
  payload: news
});

export const moreAssetNewsFail = (errorMsg) => ({
  type: ASSET_DETAIL_ACTION_TYPES.MORE_ASSET_NEWS_FAIL,
  payload: errorMsg
});

export const startAssetEventsFetch = (query = {}) => ({
  type: ASSET_DETAIL_ACTION_TYPES.INITIAL_ASSET_EVENTS_FETCH,
  payload: query
});

export const initialAssetEventsSuccess = (events) => ({
  type: ASSET_DETAIL_ACTION_TYPES.INITIAL_ASSET_EVENTS_SUCCESS,
  payload: events
});

export const initialAssetEventsFail = (errorMsg) => ({
  type: ASSET_DETAIL_ACTION_TYPES.INITIAL_ASSET_EVENTS_FAIL,
  payload: errorMsg
});

export const startNextAssetEventsFetch = (query = {}) => ({
  type: ASSET_DETAIL_ACTION_TYPES.FETCH_MORE_ASSET_EVENTS,
  payload: query
});

export const moreAssetEventsSuccess = (events) => ({
  type: ASSET_DETAIL_ACTION_TYPES.MORE_ASSET_NEWS_SUCCESS,
  payload: events
});

export const moreAssetEventsFail = (errorMsg) => ({
  type: ASSET_DETAIL_ACTION_TYPES.MORE_ASSET_NEWS_FAIL,
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
