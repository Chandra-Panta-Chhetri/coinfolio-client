import { takeLatest, put, call, all, select } from "redux-saga/effects";
import {
  fetchEventsFail,
  fetchEventsSuccess,
  fetchNewsFail,
  fetchNewsSuccess,
  fetchMoreEventsFail,
  fetchMoreEventsSuccess,
  fetchMoreNewsFail,
  fetchMoreNewsSuccess,
  noMoreEvents,
  noMoreNews
} from "./discover.actions";
import DISCOVER_ACTION_TYPES from "./discover.action.types";
import { selectEventFilters, selectNewsPage, selectNews, selectEvents, selectEventsPage } from "./discover.selectors";
import { newsAPI, eventsAPI } from "../../api";
import { convertDateToYYYYMMDD } from "../../utils";
import EVENTS_FILTERS from "../../components/Events/filters";

function* getNews({ payload: { filter } }) {
  try {
    const response = yield newsAPI.getNews({ filter });
    const news = yield response?.results;
    if (news?.length === 0) {
      return yield put(noMoreNews());
    }
    yield put(fetchNewsSuccess(news));
  } catch (err) {
    yield put(noMoreNews());
    yield put(fetchNewsFail("Failed to get the news"));
  }
}

function* getMoreNews({ payload: { filter } }) {
  try {
    const page = yield select(selectNewsPage);
    const response = yield newsAPI.getNews({ filter, page });
    const news = yield response?.results;
    const currentNews = yield select(selectNews);
    const combinedNews = yield [...currentNews, ...news];
    if (news?.length === 0 || combinedNews.length >= response?.totalResults) {
      return yield put(noMoreNews());
    }
    yield put(fetchMoreNewsSuccess(combinedNews));
  } catch (err) {
    yield put(noMoreNews());
    yield put(fetchMoreNewsFail("Failed to get more news"));
  }
}

function* getEvents() {
  try {
    const filters = yield select(selectEventFilters);
    const filtersDTO = {
      max: filters?.limit,
      showOnly: EVENTS_FILTERS.TYPES[filters?.showOnly]?.value,
      ...(filters?.dateRange?.start && { dateRangeStart: convertDateToYYYYMMDD(filters?.dateRange?.start) }),
      ...(filters?.dateRange?.end && { dateRangeEnd: convertDateToYYYYMMDD(filters?.dateRange?.end) })
    };
    const response = yield eventsAPI.getEvents(filtersDTO);
    const events = yield response?.results;
    if (events?.length === 0) {
      return yield put(noMoreEvents());
    }
    yield put(fetchEventsSuccess(events));
  } catch (err) {
    yield put(noMoreEvents());
    yield put(fetchEventsFail("Failed to get the events"));
  }
}

function* getMoreEvents() {
  try {
    const page = yield select(selectEventsPage);
    const filters = yield select(selectEventFilters);
    const filtersDTO = {
      max: filters?.limit,
      showOnly: EVENTS_FILTERS.TYPES[filters?.showOnly]?.value,
      page,
      ...(filters?.dateRange?.start && { dateRangeStart: convertDateToYYYYMMDD(filters?.dateRange?.start) }),
      ...(filters?.dateRange?.end && { dateRangeEnd: convertDateToYYYYMMDD(filters?.dateRange?.end) })
    };
    const response = yield eventsAPI.getEvents(filtersDTO);
    const events = yield response?.results;
    const currentEvents = yield select(selectEvents);
    const combinedEvents = yield [...currentEvents, ...events];
    if (events?.length === 0 || combinedEvents.length >= response?.metadata?.total_count) {
      return yield put(noMoreEvents());
    }
    yield put(fetchMoreEventsSuccess(combinedEvents));
  } catch (err) {
    yield put(noMoreEvents());
    yield put(fetchMoreEventsFail("Failed to get more events"));
  }
}

function* watchFetchNews() {
  yield takeLatest(DISCOVER_ACTION_TYPES.FETCH_NEWS, getNews);
}

function* watchFetchMoreNews() {
  yield takeLatest(DISCOVER_ACTION_TYPES.FETCH_MORE_NEWS, getMoreNews);
}

function* watchFetchEvents() {
  yield takeLatest(DISCOVER_ACTION_TYPES.FETCH_EVENTS, getEvents);
}

function* watchFetchMoreEvents() {
  yield takeLatest(DISCOVER_ACTION_TYPES.FETCH_MORE_EVENTS, getMoreEvents);
}

export default function* discoverSagas() {
  yield all([call(watchFetchEvents), call(watchFetchNews), call(watchFetchMoreNews), call(watchFetchMoreEvents)]);
}
