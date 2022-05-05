import axios from "./axios-config";

export const fetchMarketSummary = async () => {
  const res = await axios.get("/markets/summary");
  return res.data;
};

export const fetchTopCoins = async (query = {}) => {
  const res = await axios.get("/markets/top-coins", { params: query });
  return res.data.data;
};

export const fetchGainersLosers = async (query = {}) => {
  const res = await axios.get("/markets/gainers-losers", { params: query });
  return res.data;
};
