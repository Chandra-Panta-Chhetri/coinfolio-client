import NEWS_ACTION_TYPES from "./news.action.types";
import { takeLatest, put, call, all } from "redux-saga/effects";
import {
  eventsFetchFail,
  eventsFetchSuccess,
  newsFetchFail,
  newsFetchSuccess
} from "./news.actions";

function* getNews({ payload: { limit, filter } }) {
  try {
    const news = yield [];
    yield put(newsFetchSuccess(news));
  } catch (err) {
    yield put(
      newsFetchFail("There was a server error while fetching the latest news")
    );
  }
}

function* getEvents({ payload: { limit, filter } }) {
  try {
    const events = yield [];
    yield put(eventsFetchSuccess(events));
  } catch (err) {
    yield put(
      eventsFetchFail(
        "There was a server error while fetching the latest events"
      )
    );
  }
}

function* watchNewsFetchStart() {
  yield takeLatest(NEWS_ACTION_TYPES.START_NEWS_FETCH, getNews);
}

function* watchEventsFetchStart() {
  yield takeLatest(NEWS_ACTION_TYPES.START_EVENTS_FETCH, getEvents);
}

export default function* newsSagas() {
  yield all([call(watchEventsFetchStart), call(watchNewsFetchStart)]);
}
