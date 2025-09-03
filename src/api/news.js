import axios from "./axios-config";

export const getNews = async (queryParams = {}) => {
  console.log(queryParams);
  const defaultParams = { kind: "news" };
  const params = { ...defaultParams, ...queryParams };
  const res = await axios.get("/news", { params });
  const news = res?.data;
  return news;
};
