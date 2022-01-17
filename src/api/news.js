import axios from "./axios-config";

export const fetchNews = async (queryParams = {}) => {
  try {
    const params = { ...queryParams, kind: "news" };
    const news = await axios.get("/news", { params });
    return news.data;
  } catch (err) {
    return { totalResults: 0, results: [] };
  }
};
