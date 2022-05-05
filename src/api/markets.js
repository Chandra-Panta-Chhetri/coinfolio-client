import axios from "./axios-config";

export const fetchMarketSummary = async () => {
  const res = await axios.get("/markets/summary");
  return res.data;
};
