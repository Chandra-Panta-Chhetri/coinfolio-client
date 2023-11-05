import { takeLatest, put, call, all, select } from "redux-saga/effects";
import {
  fetchCurrenciesFail,
  fetchCurrenciesSuccess,
  fetchMoreCurrenciesFail,
  fetchMoreCurrenciesSuccess,
  noMoreCurrencies
} from "./currency.actions";
import CURRENCY_ACTION_TYPES from "./currency.action.types";
import { selectCurrenciesPage, selectCurrencies, selectCurrenciesPerPage } from "./currency.selectors";
import { currenciesAPI } from "../../api";

function* getCurrencies() {
  try {
    const perPage = yield select(selectCurrenciesPerPage);
    const currencies = yield currenciesAPI.getCurrencies({ perPage });
    if (currencies?.length === 0) {
      return yield put(noMoreCurrencies());
    }
    yield put(fetchCurrenciesSuccess(currencies));
  } catch (err) {
    yield put(fetchCurrenciesFail("Failed to get the currencies"));
  }
}

function* getMoreCurrencies() {
  try {
    const page = yield select(selectCurrenciesPage);
    const perPage = yield select(selectCurrenciesPerPage);
    const currencies = yield currenciesAPI.getCurrencies({ page, perPage });
    const currentCurrencies = yield select(selectCurrencies);
    const combinedCurrencies = yield [...currentCurrencies, ...currencies];
    if (currencies?.length === 0) {
      return yield put(noMoreCurrencies());
    }
    yield put(fetchMoreCurrenciesSuccess(combinedCurrencies));
  } catch (err) {
    yield put(fetchMoreCurrenciesFail("Failed to get more currencies"));
  }
}

function* watchFetchCurrencies() {
  yield takeLatest(CURRENCY_ACTION_TYPES.FETCH_CURRENCIES, getCurrencies);
}

function* watchFetchMoreCurrencies() {
  yield takeLatest(CURRENCY_ACTION_TYPES.FETCH_MORE_CURRENCIES, getMoreCurrencies);
}

export default function* currencySagas() {
  yield all([call(watchFetchCurrencies), call(watchFetchMoreCurrencies)]);
}
