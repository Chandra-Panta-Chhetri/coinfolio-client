import CURRENCY_ACTION_TYPES from "./currency.action.types";

const INITIAL_STATE = {
  currencies: [],
  isLoadingCurrencies: true,
  isLoadingMoreCurrencies: false,
  currenciesPage: 1,
  hasMoreCurrencies: true,
  currenciesPerPage: 20,
  selectedCurrency: null
};

const currencyReducer = (prevState = INITIAL_STATE, action) => {
  switch (action?.type) {
    case CURRENCY_ACTION_TYPES.FETCH_CURRENCIES:
      return {
        ...prevState,
        currencies: [],
        isLoadingCurrencies: true,
        hasMoreCurrencies: true,
        currenciesPage: 1
      };
    case CURRENCY_ACTION_TYPES.FETCH_CURRENCIES_FAIL:
      return {
        ...prevState,
        isLoadingCurrencies: false
      };
    case CURRENCY_ACTION_TYPES.FETCH_CURRENCIES_SUCCESS:
      return {
        ...prevState,
        currencies: action?.payload,
        isLoadingCurrencies: false,
        currenciesPage: prevState.currenciesPage + 1
      };
    case CURRENCY_ACTION_TYPES.FETCH_MORE_CURRENCIES:
      return {
        ...prevState,
        isLoadingMoreCurrencies: true
      };
    case CURRENCY_ACTION_TYPES.FETCH_MORE_CURRENCIES_FAIL:
      return {
        ...prevState,
        isLoadingMoreCurrencies: false
      };
    case CURRENCY_ACTION_TYPES.FETCH_MORE_CURRENCIES_SUCCESS:
      return {
        ...prevState,
        isLoadingMoreCurrencies: false,
        currencies: action?.payload,
        currenciesPage: prevState.currenciesPage + 1
      };
    case CURRENCY_ACTION_TYPES.NO_MORE_CURRENCIES:
      return {
        ...prevState,
        isLoadingMoreCurrencies: false,
        hasMoreCurrencies: false,
        isLoadingCurrencies: false
      };
    case CURRENCY_ACTION_TYPES.FETCH_CURRENCY_SUCCESS:
      return {
        ...prevState,
        selectedCurrency: action?.payload
      };
    default:
      return prevState;
  }
};

export default currencyReducer;
