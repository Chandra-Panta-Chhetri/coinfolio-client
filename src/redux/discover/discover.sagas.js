import { takeLatest, put, call, all, select } from "redux-saga/effects";
import {
  initialEventsFail,
  initialEventsSuccess,
  initialNewsFail,
  initialNewsSuccess,
  moreEventsFail,
  moreEventsSuccess,
  moreNewsFail,
  moreNewsSuccess,
  noMoreEvents,
  noMoreNews
} from "./discover.actions";
import DISCOVER_ACTION_TYPES from "./discover.action.types";
import { selectEventFilters, selectNewsPage, selectNews, selectEvents } from "./discover.selectors";
import { newsAPI, eventsAPI } from "../../api";
import { EVENTS_CONSTANTS } from "../../constants";
import { toISOSubstring } from "../../utils";

function* getNews({ payload: { filter } }) {
  try {
    const response = yield newsAPI.getNews({ filter });
    const news = yield response.results;
    if (news.length === 0) {
      return yield put(noMoreNews());
    }
    yield put(initialNewsSuccess(news));
  } catch (err) {
    yield put(initialNewsFail("There was an error while fetching the news"));
  }
}

function* getMoreNews({ payload: { filter } }) {
  try {
    const page = yield select(selectNewsPage);
    const res = yield newsAPI.getNews({ filter, page });
    const news = yield res.results;
    const currentNews = yield select(selectNews);
    const combinedNews = yield [...currentNews, ...news];
    if (news.length === 0 || combinedNews.length >= res.totalResults) {
      return yield put(noMoreNews());
    }
    yield put(moreNewsSuccess(combinedNews));
  } catch (err) {
    yield put(moreNewsFail("There was an error while fetching more news"));
  }
}

function* getEvents() {
  try {
    const filters = yield select(selectEventFilters);
    const filtersDTO = {
      max: filters.limit,
      showOnly: EVENTS_CONSTANTS.SHOW_ONLY_FILTERS[filters.showOnly].value,
      ...(filters.dateRange.start && { dateRangeStart: toISOSubstring(filters.dateRange.start) }),
      ...(filters.dateRange.end && { dateRangeEnd: toISOSubstring(filters.dateRange.end) })
    };
    const res = yield eventsAPI.fetchEvents(filtersDTO);
    const events = yield res.results;
    if (events.length === 0) {
      return yield put(noMoreEvents());
    }
    yield put(initialEventsSuccess(events));
  } catch (err) {
    yield put(initialEventsFail("There was an error while fetching the events"));
  }
}

function* getMoreEvents() {
  try {
    const page = yield select(selectNewsPage);
    const filters = yield select(selectEventFilters);
    const filtersDTO = {
      max: filters.limit,
      showOnly: EVENTS_CONSTANTS.SHOW_ONLY_FILTERS[filters.showOnly].value,
      page,
      ...(filters.dateRange.start && { dateRangeStart: toISOSubstring(filters.dateRange.start) }),
      ...(filters.dateRange.end && { dateRangeEnd: toISOSubstring(filters.dateRange.end) })
    };
    const res = yield eventsAPI.fetchEvents(filtersDTO);
    const events = yield res.results;
    const currentEvents = yield select(selectEvents);
    const combinedEvents = yield [...currentEvents, ...events];
    if (events.length === 0 || combinedEvents.length >= res.metadata.total_count) {
      return yield put(noMoreEvents());
    }
    yield put(moreEventsSuccess(combinedNews));
  } catch (err) {
    yield put(moreEventsFail("There was an error while fetching more events"));
  }
}

function* watchInitialNewsFetch() {
  yield takeLatest(DISCOVER_ACTION_TYPES.INITIAL_NEWS_FETCH, getNews);
}

function* watchMoreNewsFetch() {
  yield takeLatest(DISCOVER_ACTION_TYPES.FETCH_MORE_NEWS, getMoreNews);
}

function* watchInitialEventsFetch() {
  yield takeLatest(DISCOVER_ACTION_TYPES.INITIAL_EVENTS_FETCH, getEvents);
}

function* watchMoreEventsFetch() {
  yield takeLatest(DISCOVER_ACTION_TYPES.FETCH_MORE_EVENTS, getMoreEvents);
}

export default function* discoverSagas() {
  yield all([
    call(watchInitialEventsFetch),
    call(watchInitialNewsFetch),
    call(watchMoreNewsFetch),
    call(watchMoreEventsFetch)
  ]);
}
