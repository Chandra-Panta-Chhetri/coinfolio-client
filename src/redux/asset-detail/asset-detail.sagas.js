import { takeLatest, put, call, all, select } from "redux-saga/effects";
import ASSET_DETAIL_ACTION_TYPES from "./asset-detail.action.types";
import {
  selectAssetEventFilters,
  selectAssetNewsPage,
  selectAssetEventsPage,
  selectAssetEvents,
  selectAssetNews
} from "./asset-detail.selectors";
import {
  initialAssetEventsFail,
  moreAssetEventsSuccess,
  initialAssetEventsSuccess,
  moreAssetEventsFail,
  assetAboutFail,
  assetMarketsFail,
  assetOverviewFail,
  moreAssetNewsFail,
  initialAssetNewsFail,
  assetAboutSuccess,
  assetMarketsSuccess,
  assetOverviewSuccess,
  moreAssetNewsSuccess,
  initialAssetNewsSuccess,
  noMoreAssetNews,
  noMoreAssetEvents
} from "./asset-detail.actions";
import { newsAPI, eventsAPI, marketsAPI } from "../../api";
import { EVENTS_CONSTANTS } from "../../constants";
import { toISOSubstring } from "../../utils";

function* getAssetOverview({ payload: id }) {
  try {
    const overview = yield marketsAPI.getAssetOverview(id);
    yield put(assetOverviewSuccess(overview));
  } catch (err) {
    yield put(assetOverviewFail("Server error while fetching the overview"));
  }
}

function* getAssetMarkets({ payload: id }) {
  try {
    const markets = yield marketsAPI.getAssetExchanges(id);
    yield put(assetMarketsSuccess(markets));
  } catch (err) {
    yield put(assetMarketsFail("Server error while fetching the markets"));
  }
}

function* getAssetAbout({ payload: { id, query } }) {
  try {
    const about = yield marketsAPI.getAssetAbout(id, query);
    yield put(assetAboutSuccess(about));
  } catch (err) {
    yield put(assetAboutFail("Server error while fetching the about"));
  }
}

function* getNews({ payload: query }) {
  try {
    const response = yield newsAPI.getNews({
      ...query,
      filter: query.filter || NEWS_CONSTANTS.DEFAULT_FILTER
    });
    const news = yield response.results;
    if (news.length === 0) {
      return yield put(noMoreAssetNews());
    }
    yield put(initialAssetNewsSuccess(news));
  } catch (err) {
    yield put(initialAssetNewsFail("There was an error while fetching the news"));
  }
}

function* getMoreNews({ payload: query }) {
  try {
    const page = yield select(selectAssetNewsPage);
    const res = yield newsAPI.getNews({ ...query, page });
    const news = yield res.results;
    const currentNews = yield select(selectAssetNews);
    const combinedNews = yield [...currentNews, ...news];
    if (news.length === 0 || combinedNews.length >= res.totalResults) {
      return yield put(noMoreAssetNews());
    }
    yield put(moreAssetNewsSuccess(combinedNews));
  } catch (err) {
    yield put(moreAssetNewsFail("There was an error while fetching more news"));
  }
}

function* getEvents({ payload: query }) {
  try {
    const filters = yield select(selectAssetEventFilters);
    const filtersDTO = {
      max: filters.limit,
      showOnly: EVENTS_CONSTANTS.SHOW_ONLY_FILTERS[filters.showOnly].value,
      ...(filters.dateRange.start && { dateRangeStart: toISOSubstring(filters.dateRange.start) }),
      ...(filters.dateRange.end && { dateRangeEnd: toISOSubstring(filters.dateRange.end) }),
      ...query
    };
    const res = yield eventsAPI.getEvents(filtersDTO);
    const events = yield res.results;
    if (events.length === 0) {
      return yield put(noMoreAssetEvents());
    }
    yield put(initialAssetEventsSuccess(events));
  } catch (err) {
    yield put(initialAssetEventsFail("There was an error while fetching the events"));
  }
}

function* getMoreEvents({ payload: query }) {
  try {
    const page = yield select(selectAssetEventsPage);
    const filters = yield select(selectAssetEventFilters);
    const filtersDTO = {
      max: filters.limit,
      showOnly: EVENTS_CONSTANTS.SHOW_ONLY_FILTERS[filters.showOnly].value,
      page,
      ...(filters.dateRange.start && { dateRangeStart: toISOSubstring(filters.dateRange.start) }),
      ...(filters.dateRange.end && { dateRangeEnd: toISOSubstring(filters.dateRange.end) }),
      ...query
    };
    const res = yield eventsAPI.getEvents(filtersDTO);
    const events = yield res.results;
    const currentEvents = yield select(selectAssetEvents);
    const combinedEvents = yield [...currentEvents, ...events];
    if (events.length === 0 || combinedEvents.length >= res.metadata.total_count) {
      return yield put(noMoreAssetEvents());
    }
    yield put(moreAssetEventsSuccess(combinedEvents));
  } catch (err) {
    console.log(err.message);
    yield put(moreAssetEventsFail("There was an error while fetching more events"));
  }
}

function* watchInitialNewsFetch() {
  yield takeLatest(ASSET_DETAIL_ACTION_TYPES.INITIAL_ASSET_NEWS_FETCH, getNews);
}

function* watchMoreNewsFetch() {
  yield takeLatest(ASSET_DETAIL_ACTION_TYPES.FETCH_MORE_ASSET_NEWS, getMoreNews);
}

function* watchInitialEventsFetch() {
  yield takeLatest(ASSET_DETAIL_ACTION_TYPES.INITIAL_ASSET_EVENTS_FETCH, getEvents);
}

function* watchMoreEventsFetch() {
  yield takeLatest(ASSET_DETAIL_ACTION_TYPES.FETCH_MORE_ASSET_EVENTS, getMoreEvents);
}

function* watchOverviewFetch() {
  yield takeLatest(ASSET_DETAIL_ACTION_TYPES.FETCH_ASSET_OVERVIEW, getAssetOverview);
}

function* watchMarketsFetch() {
  yield takeLatest(ASSET_DETAIL_ACTION_TYPES.FETCH_ASSET_MARKETS, getAssetMarkets);
}

function* watchAboutFetch() {
  yield takeLatest(ASSET_DETAIL_ACTION_TYPES.FETCH_ASSET_ABOUT, getAssetAbout);
}

export default function* discoverSagas() {
  yield all([
    call(watchInitialEventsFetch),
    call(watchInitialNewsFetch),
    call(watchMoreNewsFetch),
    call(watchMoreEventsFetch),
    call(watchOverviewFetch),
    call(watchMarketsFetch),
    call(watchAboutFetch)
  ]);
}
