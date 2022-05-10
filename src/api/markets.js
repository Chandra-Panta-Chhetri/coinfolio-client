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
