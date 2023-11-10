import CURRENCY_ACTION_TYPES from "./currency.action.types";

export const fetchCurrencies = (query) => ({
  type: CURRENCY_ACTION_TYPES.FETCH_CURRENCIES,
  payload: query
});

export const fetchCurrenciesSuccess = (currencies) => ({
  type: CURRENCY_ACTION_TYPES.FETCH_CURRENCIES_SUCCESS,
  payload: currencies
});

export const fetchCurrenciesFail = (errorMsg) => ({
  type: CURRENCY_ACTION_TYPES.FETCH_CURRENCIES_FAIL,
  payload: errorMsg
});

export const fetchMoreCurrencies = (query) => ({
  type: CURRENCY_ACTION_TYPES.FETCH_MORE_CURRENCIES,
  payload: query
});

export const fetchMoreCurrenciesSuccess = (currencies) => ({
  type: CURRENCY_ACTION_TYPES.FETCH_MORE_CURRENCIES_SUCCESS,
  payload: currencies
});

export const fetchMoreCurrenciesFail = (errorMsg) => ({
  type: CURRENCY_ACTION_TYPES.FETCH_MORE_CURRENCIES_FAIL,
  payload: errorMsg
});

export const noMoreCurrencies = () => ({
  type: CURRENCY_ACTION_TYPES.NO_MORE_CURRENCIES
});

export const fetchCurrencySuccess = (currency) => ({
  type: CURRENCY_ACTION_TYPES.FETCH_CURRENCY_SUCCESS,
  payload: currency
});
