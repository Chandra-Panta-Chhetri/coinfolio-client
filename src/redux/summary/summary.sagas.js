import {
  fetchTopCoinsSuccess,
  fetchNewsSummarySuccess,
  fetchGlobalSummarySuccess,
  fetchGainersLosersSuccess,
  fetchTopCoinsFail,
  fetchNewsSummaryFail,
  fetchGainersLosersFail,
  fetchGlobalSummaryFail
} from "./summary.actions";
import SUMMARY_ACTION_TYPES from "./summary.action.types";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { newsAPI, marketsAPI } from "../../api";

function* fetchTopCoins({ payload: limit }) {
  try {
    const coins = yield marketsAPI.getTopCoins({ limit });
    yield put(fetchTopCoinsSuccess(coins));
  } catch (err) {
    yield put(fetchTopCoinsFail("Failed to get the top coins"));
  }
}

function* fetchGlobalSummary() {
  try {
    const globalSummary = yield marketsAPI.getMarketSummary();
    yield put(fetchGlobalSummarySuccess(globalSummary));
  } catch (err) {
    yield put(fetchGlobalSummaryFail("Failed to get the global market summary"));
  }
}

function* fetchGainersLosers({ payload: limit }) {
  try {
    const gainersAndLosers = yield marketsAPI.getGainersLosers({ limit });
    const coins = [...gainersAndLosers?.gainers, ...gainersAndLosers?.losers];
    yield put(fetchGainersLosersSuccess(coins));
  } catch (err) {
    yield put(fetchGainersLosersFail("Failed to get the gainers and losers"));
  }
}

function* fetchNewsSummary({ payload: limit }) {
  try {
    const response = yield newsAPI.getNews();
    const news = yield response?.results?.slice(0, limit);
    yield put(fetchNewsSummarySuccess(news));
  } catch (err) {
    yield put(fetchNewsSummaryFail("Failed to get the news"));
  }
}

function* watchFetchTopCoins() {
  yield takeLatest(SUMMARY_ACTION_TYPES.FETCH_TOP_COINS, fetchTopCoins);
}

function* watchFetchGlobalSummary() {
  yield takeLatest(SUMMARY_ACTION_TYPES.FETCH_GLOBAL_SUMMARY, fetchGlobalSummary);
}

function* watchFetchGainersLosers() {
  yield takeLatest(SUMMARY_ACTION_TYPES.FETCH_GAINERS_LOSERS, fetchGainersLosers);
}

function* watchFetchNewsSummary() {
  yield takeLatest(SUMMARY_ACTION_TYPES.FETCH_NEWS_SUMMARY, fetchNewsSummary);
}

export default function* summarySagas() {
  yield all([
    call(watchFetchTopCoins),
    call(watchFetchGlobalSummary),
    call(watchFetchGainersLosers),
    call(watchFetchNewsSummary)
  ]);
}
