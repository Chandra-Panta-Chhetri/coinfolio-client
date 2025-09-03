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
  fetchAssetEventsFail,
  fetchMoreAssetEventsSuccess,
  fetchAssetEventsSuccess,
  fetchMoreAssetEventsFail,
  fetchAssetAboutFail,
  fetchAssetMarketsFail,
  fetchAssetOverviewFail,
  fetchMoreAssetNewsFail,
  fetchAssetNewsFail,
  fetchAssetAboutSuccess,
  fetchAssetMarketsSuccess,
  fetchAssetOverviewSuccess,
  fetchMoreAssetNewsSuccess,
  fetchAssetNewsSuccess,
  noMoreAssetNews,
  noMoreAssetEvents
} from "./asset-detail.actions";
import { newsAPI, eventsAPI, marketsAPI } from "../../api";
import { isNullOrUndefined, convertDateToYYYYMMDD } from "../../utils";
import NEWS_FILTERS from "../../components/News/filters";
import EVENTS_FILTERS from "../../components/Events/filters";

function* getAssetOverview({ payload: id }) {
  try {
    const overview = yield marketsAPI.getAssetOverview(id);
    if (!isNullOrUndefined(overview)) {
      yield put(fetchAssetOverviewSuccess(overview));
    } else {
      throw new Error("Failed to get overview");
    }
  } catch (err) {
    yield put(fetchAssetOverviewFail("Server error while fetching the overview"));
  }
}

function* getAssetMarkets({ payload: { id, query } }) {
  try {
    const markets = yield marketsAPI.getAssetExchanges(id, query);
    if (!isNullOrUndefined(markets)) {
      yield put(fetchAssetMarketsSuccess(markets));
    } else {
      throw new Error("Failed to get markets");
    }
  } catch (err) {
    yield put(fetchAssetMarketsFail("Server error while fetching the markets"));
  }
}

function* getAssetAbout({ payload: id }) {
  try {
    const about = yield marketsAPI.getAssetAbout(id);
    if (!isNullOrUndefined(about)) {
      yield put(fetchAssetAboutSuccess(about));
    } else {
      throw new Error("Failed to get about");
    }
  } catch (err) {
    yield put(fetchAssetAboutFail("Server error while fetching the about"));
  }
}

function* getNews({ payload: query }) {
  try {
    const response = yield newsAPI.getNews({
      ...query,
      filter: query.filter ?? NEWS_FILTERS.SHOW_ONLY.DEFAULT_OPTION.value
    });
    const news = yield response?.results;
    if (news?.length === 0) {
      return yield put(noMoreAssetNews());
    }
    yield put(fetchAssetNewsSuccess(news));
  } catch (err) {
    yield put(noMoreAssetNews());
    yield put(fetchAssetNewsFail("Failed to get the news"));
  }
}

function* getMoreNews({ payload: query }) {
  try {
    const page = yield select(selectAssetNewsPage);
    const response = yield newsAPI.getNews({
      ...query,
      filter: query.filter ?? NEWS_FILTERS.SHOW_ONLY.DEFAULT_OPTION.value,
      page
    });
    const news = yield response?.results;
    const currentNews = yield select(selectAssetNews);
    const combinedNews = yield [...currentNews, ...news];
    if (news?.length === 0 || combinedNews.length >= response?.totalResults) {
      return yield put(noMoreAssetNews());
    }
    yield put(fetchMoreAssetNewsSuccess(combinedNews));
  } catch (err) {
    yield put(noMoreAssetNews());
    yield put(fetchMoreAssetNewsFail("Failed to get more news"));
  }
}

function* getEvents({ payload: query }) {
  try {
    const filters = yield select(selectAssetEventFilters);
    const filtersDTO = {
      max: filters?.limit,
      ...(filters?.dateRange?.start && { dateRangeStart: convertDateToYYYYMMDD(filters?.dateRange?.start) }),
      ...(filters?.dateRange?.end && { dateRangeEnd: convertDateToYYYYMMDD(filters?.dateRange?.end) }),
      ...query,
      sortBy: EVENTS_FILTERS.TYPES[filters.sortBy]?.value
    };
    const response = yield eventsAPI.getEvents(filtersDTO);
    const events = yield response?.results;
    if (events?.length === 0) {
      return yield put(noMoreAssetEvents());
    }
    yield put(fetchAssetEventsSuccess(events));
  } catch (err) {
    yield put(noMoreAssetEvents());
    yield put(fetchAssetEventsFail("Failed to get the events"));
  }
}

function* getMoreEvents({ payload: query }) {
  try {
    const page = yield select(selectAssetEventsPage);
    const filters = yield select(selectAssetEventFilters);
    const filtersDTO = {
      max: filters?.limit,
      page,
      ...(filters?.dateRange?.start && { dateRangeStart: convertDateToYYYYMMDD(filters?.dateRange?.start) }),
      ...(filters?.dateRange?.end && { dateRangeEnd: convertDateToYYYYMMDD(filters?.dateRange?.end) }),
      ...query,
      sortBy: EVENTS_FILTERS.TYPES[filters?.sortBy]?.value
    };
    const response = yield eventsAPI.getEvents(filtersDTO);
    const events = yield response?.results;
    const currentEvents = yield select(selectAssetEvents);
    const combinedEvents = yield [...currentEvents, ...events];
    if (events?.length === 0 || combinedEvents.length >= response?.metadata?.total_count) {
      return yield put(noMoreAssetEvents());
    }
    yield put(fetchMoreAssetEventsSuccess(combinedEvents));
  } catch (err) {
    yield put(noMoreAssetEvents());
    yield put(fetchMoreAssetEventsFail("Failed to get more events"));
  }
}

function* watchFetchNews() {
  yield takeLatest(ASSET_DETAIL_ACTION_TYPES.FETCH_ASSET_NEWS, getNews);
}

function* watchFetchMoreNews() {
  yield takeLatest(ASSET_DETAIL_ACTION_TYPES.FETCH_MORE_ASSET_NEWS, getMoreNews);
}

function* watchFetchEvents() {
  yield takeLatest(ASSET_DETAIL_ACTION_TYPES.FETCH_ASSET_EVENTS, getEvents);
}

function* watchFetchMoreEvents() {
  yield takeLatest(ASSET_DETAIL_ACTION_TYPES.FETCH_MORE_ASSET_EVENTS, getMoreEvents);
}

function* watchFetchOverview() {
  yield takeLatest(ASSET_DETAIL_ACTION_TYPES.FETCH_ASSET_OVERVIEW, getAssetOverview);
}

function* watchFetchMarkets() {
  yield takeLatest(ASSET_DETAIL_ACTION_TYPES.FETCH_ASSET_MARKETS, getAssetMarkets);
}

function* watchFetchAbout() {
  yield takeLatest(ASSET_DETAIL_ACTION_TYPES.FETCH_ASSET_ABOUT, getAssetAbout);
}

export default function* discoverSagas() {
  yield all([
    call(watchFetchEvents),
    call(watchFetchNews),
    call(watchFetchMoreNews),
    call(watchFetchMoreEvents),
    call(watchFetchOverview),
    call(watchFetchMarkets),
    call(watchFetchAbout)
  ]);
}
