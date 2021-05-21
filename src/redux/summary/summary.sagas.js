import SUMMARY_ACTION_TYPES from "./summary.action.types";
import {
  topCoinsFetchSuccess,
  newsSummaryFetchSuccess,
  globalSummaryFetchSuccess,
  gainersLosersFetchSuccess,
  topCoinsFetchFail,
  newsSummaryFetchFail,
  gainersLosersFetchFail,
  globalSummaryFetchFail
} from "../summary/summary.actions";
import { all, call, put, takeLatest } from "redux-saga/effects";

function* fetchTopCoins() {
  try {
    const topCoins = yield [];
    yield put(topCoinsFetchSuccess(topCoins));
  } catch (err) {
    yield put(
      topCoinsFetchFail("There was a server error while fetching the top coins")
    );
  }
}

function* fetchGlobalSummary() {
  try {
    const globalSummary = yield {};
    yield put(globalSummaryFetchSuccess(globalSummary));
  } catch (err) {
    yield put(
      globalSummaryFetchFail(
        "There was a server error while fetching the global market summary"
      )
    );
  }
}

function* fetchGainersLosers() {
  try {
    const gainersLosers = yield [];
    yield put(gainersLosersFetchSuccess(gainersLosers));
  } catch (err) {
    yield put(
      gainersLosersFetchFail(
        "There was a server error while fetching the top gainers and losers"
      )
    );
  }
}

function* fetchNewsSummary() {
  try {
    const newsSummary = yield [];
    yield put(newsSummaryFetchSuccess(newsSummary));
  } catch (err) {
    yield put(
      newsSummaryFetchFail(
        "There was a server error while fetching the latest crypto news"
      )
    );
  }
}

function* watchTopCoinsFetchStart() {
  yield takeLatest(SUMMARY_ACTION_TYPES.START_TOP_COINS_FETCH, fetchTopCoins);
}

function* watchGlobalSummaryFetchStart() {
  yield takeLatest(
    SUMMARY_ACTION_TYPES.START_TOP_COINS_FETCH,
    fetchGlobalSummary
  );
}

function* watchGainersLosersFetchStart() {
  yield takeLatest(
    SUMMARY_ACTION_TYPES.START_TOP_COINS_FETCH,
    fetchGainersLosers
  );
}

function* watchNewsSummaryFetchStart() {
  yield takeLatest(
    SUMMARY_ACTION_TYPES.START_TOP_COINS_FETCH,
    fetchNewsSummary
  );
}

export default function* summarySagas() {
  yield all([
    call(watchTopCoinsFetchStart),
    call(watchGlobalSummaryFetchStart),
    call(watchGainersLosersFetchStart),
    call(watchNewsSummaryFetchStart)
  ]);
}
