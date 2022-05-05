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

export const MAX_NEWS_SUMMARIES = 4;

function* fetchTopCoins() {
  try {
    const coins = yield marketsAPI.fetchTopCoins({ limit: 5 });
    yield put(topCoinsFetchSuccess(coins));
  } catch (err) {
    yield put(topCoinsFetchFail("Error while fetching the top coins"));
  }
}

function* fetchGlobalSummary() {
  try {
    const globalSummary = yield marketsAPI.fetchMarketSummary();
    yield put(globalSummaryFetchSuccess(globalSummary));
  } catch (err) {
    yield put(globalSummaryFetchFail("Error while fetching the global market summary"));
  }
}

function* fetchGainersLosers() {
  try {
    const res = yield marketsAPI.fetchGainersLosers({ limit: 2 });
    const { gainers, losers } = yield res;
    const coins = [...gainers, ...losers];
    yield put(gainersLosersFetchSuccess(coins));
  } catch (err) {
    yield put(gainersLosersFetchFail("Error while fetching the top gainers and losers"));
  }
}

function* fetchNewsSummary() {
  try {
    const res = yield newsAPI.fetchNews();
    const newsSummary = yield res.results.slice(0, MAX_NEWS_SUMMARIES);
    yield put(newsSummarySuccess(newsSummary));
  } catch (err) {
    yield put(newsSummaryFail("There was an error while fetching the news"));
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
