import axios from "./axios-config";
import { isNullOrUndefined } from "../utils";

export const getMarketSummary = async () => {
  const res = await axios.get("/markets/summary");
  const marketSummary = res?.data;
  return marketSummary;
};

export const getTopCoins = async (query) => {
  const defaultParams = {};
  const res = await axios.get("/markets/top-coins", { params: query ?? defaultParams });
  const topCoins = res?.data?.data;
  return topCoins;
};

export const getGainersLosers = async (query) => {
  const defaultParams = {};
  const res = await axios.get("/markets/gainers-losers", { params: query ?? defaultParams });
  const gainersLosers = res?.data;
  return gainersLosers;
};

export const getMarkets = async (query) => {
  const defaultParams = {};
  const res = await axios.get("/markets", { params: query ?? defaultParams });
  const markets = res?.data?.data;
  return markets;
};

export const getCoinsByKeyword = async (keyword) => {
  if (isNullOrUndefined(keyword) || keyword === "") {
    return [];
  }
  const res = await axios.get("/markets/search", { params: { search: keyword } });
  const coinsWithKeyword = res?.data?.data;
  return coinsWithKeyword;
};

export const getAssetOverview = async (id) => {
  if (!isNullOrUndefined(id)) {
    const res = await axios.get(`/markets/${id}/overview`);
    const overview = res?.data;
    return overview;
  }
  return null;
};

export const getAssetExchanges = async (id, query) => {
  if (!isNullOrUndefined(id)) {
    const defaultParams = { perPage: 2000, page: 1 };
    const res = await axios.get(`/markets/${id}/exchanges`, { params: query ?? defaultParams });
    const exchanges = res?.data?.data;
    return exchanges;
  }
  return null;
};

export const getAssetAbout = async (id) => {
  if (!isNullOrUndefined(id)) {
    const res = await axios.get(`/markets/${id}/about`);
    const about = res?.data;
    return about;
  }
  return null;
};
