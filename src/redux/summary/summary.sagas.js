import {
  topCoinsFetchSuccess,
  newsSummarySuccess,
  globalSummaryFetchSuccess,
  gainersLosersFetchSuccess,
  topCoinsFetchFail,
  newsSummaryFail,
  gainersLosersFetchFail,
  globalSummaryFetchFail
} from "./summary.actions";
import SUMMARY_ACTION_TYPES from "./summary.action.types";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { newsAPI, marketsAPI } from "../../api";

function* fetchTopCoins({ payload: limit }) {
  try {
    const coins = yield marketsAPI.getTopCoins({ limit });
    yield put(topCoinsFetchSuccess(coins));
  } catch (err) {
    yield put(topCoinsFetchFail("Error while fetching the top coins"));
  }
}

function* fetchGlobalSummary() {
  try {
    const globalSummary = yield marketsAPI.getMarketSummary();
    yield put(globalSummaryFetchSuccess(globalSummary));
  } catch (err) {
    yield put(globalSummaryFetchFail("Error while getting the global market summary"));
  }
}

function* fetchGainersLosers({ payload: limit }) {
  try {
    const res = yield marketsAPI.getGainersLosers({ limit });
    const coins = [...res.gainers, ...res.losers];
    yield put(gainersLosersFetchSuccess(coins));
  } catch (err) {
    yield put(gainersLosersFetchFail("Error while getting the gainers and losers"));
  }
}

function* fetchNewsSummary({ payload: limit }) {
  try {
    const res = yield newsAPI.getNews();
    const newsSummary = yield res.results.slice(0, limit);
    yield put(newsSummarySuccess(newsSummary));
  } catch (err) {
    yield put(newsSummaryFail("Error while getting the news"));
  }
}

function* watchTopCoinsFetchStart() {
  yield takeLatest(SUMMARY_ACTION_TYPES.START_TOP_COINS_FETCH, fetchTopCoins);
}

function* watchGlobalSummaryFetchStart() {
  yield takeLatest(SUMMARY_ACTION_TYPES.START_GLOBAL_SUMMARY_FETCH, fetchGlobalSummary);
}

function* watchGainersLosersFetchStart() {
  yield takeLatest(SUMMARY_ACTION_TYPES.START_GAINERS_LOSERS_FETCH, fetchGainersLosers);
}

function* watchNewsSummaryFetch() {
  yield takeLatest(SUMMARY_ACTION_TYPES.NEWS_SUMMARY_FETCH, fetchNewsSummary);
}

export default function* summarySagas() {
  yield all([
    call(watchTopCoinsFetchStart),
    call(watchGlobalSummaryFetchStart),
    call(watchGainersLosersFetchStart),
    call(watchNewsSummaryFetch)
  ]);
}
