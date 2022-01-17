import axios from "./axios-config";

export const fetchNews = async (queryParams = {}) => {
  const params = { ...queryParams, kind: "news" };
  const news = await axios.get("/news", { params });
  return news.data;
};
