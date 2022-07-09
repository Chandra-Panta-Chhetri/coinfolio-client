import axios from "./axios-config";

export const getMarketSummary = async () => {
  const res = await axios.get("/markets/summary");
  return res.data;
};

export const getTopCoins = async (query = {}) => {
  const res = await axios.get("/markets/top-coins", { params: query });
  return res.data.data;
};

export const getGainersLosers = async (query = {}) => {
  const res = await axios.get("/markets/gainers-losers", { params: query });
  return res.data;
};

export const getMarkets = async (query = {}) => {
  const res = await axios.get("/markets", { params: query });
  return res.data.data;
};

export const getCoinsByKeyword = async (keyword) => {
  if (keyword === "") {
    return [];
  }
  const res = await axios.get("/markets/search", { params: { search: keyword } });
  return res.data.data;
};

export const getAssetOverview = async (id) => {
  const res = await axios.get(`/markets/${id}/overview`);
  return res.data;
};

export const getAssetExchanges = async (id, query = { perPage: 2000, page: 1 }) => {
  const res = await axios.get(`/markets/${id}/exchanges`, { params: query });
  return res.data.data;
};

export const getAssetAbout = async (id, query) => {
  const res = await axios.get(`/markets/${id}/about`, { params: query });
  return res.data;
};
