import { takeLatest, put, call, all, select } from "redux-saga/effects";
import {
  noMoreMarkets,
  marketsFetchSuccess,
  marketsFetchFail
} from "./market.actions";
import MARKET_ACTION_TYPES from "./market.action.types";
import {
  selectCurrentPage,
  selectMarketFilters,
  selectMarketsPerPage,
  selectMarkets,
  selectHasMoreMarkets
} from "./market.selectors";

function* fetchMarkets() {
  const hasMore = yield select(selectHasMoreMarkets);
  if (!hasMore) {
    return yield;
  }

  const filters = yield select(selectMarketFilters);
  const pageNum = yield select(selectCurrentPage);
  const perPage = yield select(selectMarketsPerPage);
  const currentMarkets = yield select(selectMarkets);

  try {
    const newMarkets = [];
    if (newMarkets.length === 0) {
      return yield put(noMoreMarkets());
    }
    const combinedMarkets = [...currentMarkets, ...newMarkets];
    yield put(marketsFetchSuccess(combinedMarkets));
  } catch (err) {
    yield put(marketsFetchFail());
  }
}

function* watchMarketsFetch() {
  yield takeLatest(
    [
      MARKET_ACTION_TYPES.UPDATE_FILTERS,
      MARKET_ACTION_TYPES.START_MARKETS_FETCH
    ],
    fetchMarkets
  );
}

export default function* marketSagas() {
  yield all([call(watchMarketsFetch)]);
}
