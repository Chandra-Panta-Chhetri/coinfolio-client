import { takeLatest, put, call, all, select } from "redux-saga/effects";
import {
  noMoreMarkets,
  marketsFetchSuccess,
  marketsFetchFail,
  moreMarketsSuccess,
  moreMarketsFail
} from "./market.actions";
import MARKET_ACTION_TYPES from "./market.action.types";
import {
  selectCurrentPage,
  selectMarketFilters,
  selectMarketsPerPage,
  selectMarkets,
  selectHasMoreMarkets
} from "./market.selectors";
import { marketsAPI } from "../../api";

function* fetchMarkets() {
  try {
    const filters = yield select(selectMarketFilters);
    const perPage = yield select(selectMarketsPerPage);
    const markets = yield marketsAPI.getMarkets({
      sortBy: filters.sortBy.value,
      sortOrder: filters.sortOrder.value,
      perPage,
      page: 1
    });

    if (markets.length === 0) {
      return yield put(noMoreMarkets());
    }

    yield put(marketsFetchSuccess(markets));
  } catch (err) {
    yield put(marketsFetchFail("Error while fetching the markets"));
  }
}

function* fetchMoreMarkets() {
  try {
    const hasMore = yield select(selectHasMoreMarkets);
    if (!hasMore) {
      return yield;
    }

    const filters = yield select(selectMarketFilters);
    const pageNum = yield select(selectCurrentPage);
    const perPage = yield select(selectMarketsPerPage);
    const currentMarkets = yield select(selectMarkets);

    const newMarkets = yield marketsAPI.getMarkets({
      sortBy: filters.sortBy.value,
      sortOrder: filters.sortOrder.value,
      perPage,
      page: pageNum
    });

    if (newMarkets.length === 0) {
      return yield put(noMoreMarkets());
    }
    const combinedMarkets = [...currentMarkets, ...newMarkets];
    yield put(moreMarketsSuccess(combinedMarkets));
  } catch (err) {
    yield put(moreMarketsFail("Error while fetching more markets"));
  }
}

function* watchMarketsFetch() {
  yield takeLatest([MARKET_ACTION_TYPES.UPDATE_FILTERS, MARKET_ACTION_TYPES.INITIAL_MARKETS_FETCH], fetchMarkets);
}

function* watchMoreMarketsFetch() {
  yield takeLatest(MARKET_ACTION_TYPES.FETCH_MORE_MARKETS, fetchMoreMarkets);
}

export default function* marketSagas() {
  yield all([call(watchMarketsFetch), call(watchMoreMarketsFetch)]);
}
