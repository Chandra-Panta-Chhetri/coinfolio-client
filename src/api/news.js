import axios from "./axios-config";

export const getNews = async (queryParams = {}) => {
  const params = { ...queryParams, kind: "news" };
  const news = await axios.get("/news", { params });
  return news.data;
};
