import { createSelector } from "reselect";

const selectCurrencyStore = (state) => state?.currency;

export const selectCurrencies = createSelector([selectCurrencyStore], (cs) => cs?.currencies);

export const selectIsLoadingCurrencies = createSelector([selectCurrencyStore], (cs) => cs?.isLoadingCurrencies);

export const selectIsLoadingMoreCurrencies = createSelector([selectCurrencyStore], (cs) => cs?.isLoadingMoreCurrencies);

export const selectCurrenciesPage = createSelector([selectCurrencyStore], (cs) => cs?.currenciesPage);

export const selectHasMoreCurrencies = createSelector([selectCurrencyStore], (cs) => cs?.hasMoreCurrencies);

export const selectCurrenciesPerPage = createSelector([selectCurrencyStore], (cs) => cs?.currenciesPerPage);

export const selectSelectedCurrency = createSelector([selectCurrencyStore], (cs) => cs?.selectedCurrency);
