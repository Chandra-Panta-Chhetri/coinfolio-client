import { takeLatest, put, call, all, select } from "redux-saga/effects";
import { noMoreMarkets, marketsFetchSuccess, marketsFetchFail } from "./market.actions";
import MARKET_ACTION_TYPES from "./market.action.types";
import {
  selectCurrentPage,
  selectMarketFilters,
  selectMarketsPerPage,
  selectMarkets,
  selectHasMoreMarkets
} from "./market.selectors";
import dummydata from "../portfolio/dummydata.json";
import { delayJS } from "../../utils";

function* fetchMarkets() {
  try {
    const hasMore = yield select(selectHasMoreMarkets);
    if (!hasMore) {
      return yield;
    }

    const filters = yield select(selectMarketFilters);
    const pageNum = yield select(selectCurrentPage);
    const perPage = yield select(selectMarketsPerPage);
    const currentMarkets = yield select(selectMarkets);

    let newMarkets = [
      {
        iconUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
        rank: Math.floor(Math.random() * 500),
        symbol: "BTC",
        marketCap: 123032,
        sparkLine: dummydata.data.prices.week,
        price: 64000,
        percentChange: 2.3
      },
      {
        iconUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png",
        rank: Math.floor(Math.random() * 500),
        symbol: "ETH",
        marketCap: 23032,
        sparkLine: dummydata.data.prices.week,
        price: 4000,
        percentChange: -5.2
      }
    ];

    if (newMarkets.length === 0) {
      return yield put(noMoreMarkets());
    }
    const combinedMarkets = [...currentMarkets, ...newMarkets];
    yield delayJS(3000);
    yield put(marketsFetchSuccess(combinedMarkets));
  } catch (err) {
    yield put(marketsFetchFail());
  }
}

function* watchMarketsFetch() {
  yield takeLatest([MARKET_ACTION_TYPES.UPDATE_FILTERS, MARKET_ACTION_TYPES.START_MARKETS_FETCH], fetchMarkets);
}

export default function* marketSagas() {
  yield all([call(watchMarketsFetch)]);
}
