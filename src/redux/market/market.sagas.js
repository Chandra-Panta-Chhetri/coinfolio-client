import { takeLatest, put, call, all, select } from "redux-saga/effects";
import {
  noMoreMarkets,
  marketsFetchSuccess,
  marketsFetchFail,
  moreMarketsSuccess,
  moreMarketsFail,
  trendingSearchesSuccess,
  trendingSearchesFail,
  recentSearchesFail,
  recentSearchesSuccess,
  searchResultsFail,
  searchResultsSuccess
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

function* fetchTrendingSearches() {
  try {
    const searches = [
      {
        image: "https://coincap.io/static/logo_mark.png",
        name: "Bitcoin",
        id: "bitcoin",
        symbol: "BTC"
      },
      {
        image: "https://coincap.io/static/logo_mark.png",
        name: "Ethereum",
        id: "ethereum",
        symbol: "ETH"
      }
    ];
    yield new Promise((res, rej) =>
      setTimeout(() => {
        res();
      }, 5000)
    );
    yield put(trendingSearchesSuccess(searches));
  } catch (err) {
    yield put(trendingSearchesFail("Error while fetching trending searches"));
  }
}

function* fetchRecentSearches() {
  try {
    const searches = [
      {
        image: "https://coincap.io/static/logo_mark.png",
        name: "Bitcoin",
        id: "bitcoin",
        symbol: "BTC"
      },
      {
        image: "https://coincap.io/static/logo_mark.png",
        name: "Ethereum",
        id: "ethereum",
        symbol: "ETH"
      }
    ];
    yield new Promise((res, rej) =>
      setTimeout(() => {
        res();
      }, 5000)
    );
    yield put(recentSearchesSuccess(searches));
  } catch (err) {
    yield put(recentSearchesFail("Error while fetching recent searches"));
  }
}

function* fetchSearchResults({ payload: keyword }) {
  try {
    const searches = yield marketsAPI.getCoinsByKeyword(keyword);
    yield put(searchResultsSuccess(searches));
  } catch (err) {
    yield put(searchResultsFail("Error while fetching search results"));
  }
}

function* watchMarketsFetch() {
  yield takeLatest([MARKET_ACTION_TYPES.UPDATE_FILTERS, MARKET_ACTION_TYPES.INITIAL_MARKETS_FETCH], fetchMarkets);
}

function* watchMoreMarketsFetch() {
  yield takeLatest(MARKET_ACTION_TYPES.FETCH_MORE_MARKETS, fetchMoreMarkets);
}

function* watchTrendingSearchesFetch() {
  yield takeLatest(MARKET_ACTION_TYPES.FETCH_TRENDING_SEARCHES, fetchTrendingSearches);
}

function* watchRecentSearchesFetch() {
  yield takeLatest(MARKET_ACTION_TYPES.FETCH_RECENT_SEARCHES, fetchRecentSearches);
}

function* watchSearchResultsFetch() {
  yield takeLatest(MARKET_ACTION_TYPES.FETCH_SEARCH_RESULTS, fetchSearchResults);
}

export default function* marketSagas() {
  yield all([
    call(watchMarketsFetch),
    call(watchMoreMarketsFetch),
    call(watchTrendingSearchesFetch),
    call(watchRecentSearchesFetch),
    call(watchSearchResultsFetch)
  ]);
}
