import { store } from "../";
import { currenciesAPI } from "../../api";
import { isNullOrUndefined } from "../../utils";
import { changeCurrency, selectCurrencyCode } from "../preferences";
import { fetchCurrencySuccess } from "./currency.actions";

export const getCurrencyFromPreference = async () => {
  try {
    const currencyCode = selectCurrencyCode(store.getState());
    if (currencyCode !== "USD") {
      const currency = await currenciesAPI.getCurrency(currencyCode);
      if (isNullOrUndefined(currency)) {
        store.dispatch(changeCurrency("USD"));
      } else {
        store.dispatch(fetchCurrencySuccess(currency));
      }
    }
  } catch (err) {
    console.log("GET CURRENCY ON STARTUP FAILED" + err);
    store.dispatch(changeCurrency("USD"));
  }
};
