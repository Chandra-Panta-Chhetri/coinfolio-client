import axios from "./axios-config";

export const getNews = async (queryParams = {}) => {
  try {
    const news = await axios.get("/news", { params: queryParams });
    return news.data;
  } catch (err) {
    return { totalResults: 0, results: [] };
  }
};
