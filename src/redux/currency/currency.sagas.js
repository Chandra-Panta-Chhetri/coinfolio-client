import { takeLatest, put, call, all, select } from "redux-saga/effects";
import {
  fetchCurrenciesFail,
  fetchCurrenciesSuccess,
  fetchCurrencyFail,
  fetchCurrencySuccess,
  fetchMoreCurrenciesFail,
  fetchMoreCurrenciesSuccess,
  noMoreCurrencies
} from "./currency.actions";
import CURRENCY_ACTION_TYPES from "./currency.action.types";
import { selectCurrenciesPage, selectCurrencies, selectCurrenciesPerPage } from "./currency.selectors";
import { currenciesAPI } from "../../api";
import { isNullOrUndefined } from "../../utils";
import PREFERENCES_ACTION_TYPES from "../preferences/preferences.action.types";
import { changeCurrency } from "../preferences/preferences.actions";

function* getCurrencies() {
  try {
    const perPage = yield select(selectCurrenciesPerPage);
    const currencies = yield currenciesAPI.getCurrencies({ perPage });
    if (currencies?.length === 0) {
      return yield put(noMoreCurrencies());
    }
    yield put(fetchCurrenciesSuccess(currencies));
  } catch (err) {
    yield put(noMoreCurrencies());
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
    yield put(noMoreCurrencies());
    yield put(fetchMoreCurrenciesFail("Failed to get more currencies"));
  }
}

function* getCurrency({ payload: currencyCode }) {
  try {
    if (currencyCode !== "USD") {
      const currency = yield currenciesAPI.getCurrency(currencyCode);
      if (isNullOrUndefined(currency)) {
        yield put(changeCurrency("USD"));
      } else {
        yield put(fetchCurrencySuccess(currency));
      }
    } else {
      yield put(fetchCurrencySuccess());
    }
  } catch (err) {
    console.log("GET CURRENCY FAILED" + err);
    yield put(changeCurrency("USD"));
  }
}

function* watchFetchCurrencies() {
  yield takeLatest(CURRENCY_ACTION_TYPES.FETCH_CURRENCIES, getCurrencies);
}

function* watchFetchMoreCurrencies() {
  yield takeLatest(CURRENCY_ACTION_TYPES.FETCH_MORE_CURRENCIES, getMoreCurrencies);
}

function* watchChangeCurrencyPreference() {
  yield takeLatest(PREFERENCES_ACTION_TYPES.CHANGE_CURRENCY, getCurrency);
}

export default function* currencySagas() {
  yield all([call(watchFetchCurrencies), call(watchFetchMoreCurrencies), call(watchChangeCurrencyPreference)]);
}
