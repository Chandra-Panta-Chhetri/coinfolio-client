import axios from "./axios-config";

export const getCurrencies = async (queryParams = {}) => {
  const res = await axios.get("/currencies", {
    params: queryParams
  });
  const currencies = res?.data;
  return currencies;
};

export const getCurrency = async (currencyCode) => {
  const res = await axios.get(`/currencies/${currencyCode}`);
  const currency = res?.data;
  return currency;
};
