import { takeLatest, put, call, all, select } from "redux-saga/effects";
import {
  noMoreMarkets,
  fetchMarketsSuccess,
  fetchMarketsFail,
  fetchMoreMarketsSuccess,
  fetchMoreMarketsFail,
  fetchTrendingSearchesSuccess,
  fetchTrendingSearchesFail,
  fetchRecentSearchesFail,
  fetchRecentSearchesSuccess,
  fetchSearchResultsFail,
  fetchSearchResultsSuccess
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
      sortBy: filters?.sortBy?.value,
      sortOrder: filters?.sortOrder?.value,
      perPage,
      page: 1
    });
    if (markets?.length === 0) {
      return yield put(noMoreMarkets());
    }
    yield put(fetchMarketsSuccess(markets));
  } catch (err) {
    yield put(fetchMarketsFail("Failed to get the markets"));
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
      sortBy: filters?.sortBy?.value,
      sortOrder: filters?.sortOrder?.value,
      perPage,
      page: pageNum
    });
    if (newMarkets?.length === 0) {
      return yield put(noMoreMarkets());
    }
    const combinedMarkets = [...currentMarkets, ...newMarkets];
    yield put(fetchMoreMarketsSuccess(combinedMarkets));
  } catch (err) {
    yield put(fetchMoreMarketsFail("Failed to get more markets"));
  }
}

function* fetchTrendingSearches() {
  try {
    const searches = [];
    yield put(fetchTrendingSearchesSuccess(searches));
  } catch (err) {
    yield put(fetchTrendingSearchesFail("Failed to get trending searches"));
  }
}

function* fetchRecentSearches() {
  try {
    const searches = [];
    yield put(fetchRecentSearchesSuccess(searches));
  } catch (err) {
    yield put(fetchRecentSearchesFail("Failed to get recent searches"));
  }
}

function* fetchSearchResults({ payload: keyword }) {
  try {
    const searches = yield marketsAPI.getCoinsByKeyword(keyword);
    yield put(fetchSearchResultsSuccess(searches));
  } catch (err) {
    yield put(fetchSearchResultsFail("Failed to get search results"));
  }
}

function* watchFetchMarkets() {
  yield takeLatest([MARKET_ACTION_TYPES.UPDATE_FILTERS, MARKET_ACTION_TYPES.FETCH_MARKETS], fetchMarkets);
}

function* watchFetchMoreMarkets() {
  yield takeLatest(MARKET_ACTION_TYPES.FETCH_MORE_MARKETS, fetchMoreMarkets);
}

function* watchFetchTrendingSearches() {
  yield takeLatest(MARKET_ACTION_TYPES.FETCH_TRENDING_SEARCHES, fetchTrendingSearches);
}

function* watchFetchRecentSearches() {
  yield takeLatest(MARKET_ACTION_TYPES.FETCH_RECENT_SEARCHES, fetchRecentSearches);
}

function* watchFetchSearchResults() {
  yield takeLatest(MARKET_ACTION_TYPES.FETCH_SEARCH_RESULTS, fetchSearchResults);
}

export default function* marketSagas() {
  yield all([
    call(watchFetchMarkets),
    call(watchFetchMoreMarkets),
    call(watchFetchTrendingSearches),
    call(watchFetchRecentSearches),
    call(watchFetchSearchResults)
  ]);
}
