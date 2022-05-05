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
    const topCoins = yield [
      {
        ticker: "BTC",
        price: 69230.24,
        percentChange: -4.25,
        image: "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"
      },
      {
        ticker: "LTC",
        price: 400,
        percentChange: +7.0,
        image: "https://s2.coinmarketcap.com/static/img/coins/64x64/2.png"
      },
      {
        ticker: "ETH",
        price: 4800.24,
        percentChange: -2.25,
        image: "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png"
      },
      {
        ticker: "BNB",
        price: 800.24,
        percentChange: -10.25,
        image: "https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png"
      },
      {
        ticker: "USDT",
        price: 1,
        percentChange: 3.25,
        image: "https://s2.coinmarketcap.com/static/img/coins/64x64/825.png"
      }
    ];
    // yield delayJS(7000);
    yield put(topCoinsFetchSuccess(topCoins));
  } catch (err) {
    yield put(topCoinsFetchFail("There was a server error while fetching the top coins"));
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
    const gainersLosers = yield [
      {
        fullName: "Bitcoin",
        ticker: "BTC",
        price: 69230.24,
        percentChange: 4.25,
        image: "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"
      },
      {
        fullName: "Ethereum",
        ticker: "ETH",
        price: 4800.24,
        percentChange: -2.25,
        image: "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png"
      },
      {
        fullName: "Litecoin",
        ticker: "LTC",
        price: 400,
        percentChange: 7,
        image: "https://s2.coinmarketcap.com/static/img/coins/64x64/2.png"
      },
      {
        fullName: "Binance Coin",
        ticker: "BNB",
        price: 800.24,
        percentChange: -10.25,
        image: "https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png"
      }
    ];
    // yield delayJS(9000);
    yield put(gainersLosersFetchSuccess(gainersLosers));
  } catch (err) {
    yield put(gainersLosersFetchFail("There was a server error while fetching the top gainers and losers"));
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
