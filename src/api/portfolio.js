import axios from "./axios-config";

export const getOverview = async (portfolioId, token) => {
  const res = await axios.get(`/portfolios/${portfolioId}/overview`, {
    headers: {
      "X-Auth-Token": token
    }
  });
  return res.data;
};
