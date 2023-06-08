import axios from "./axios-config";

export const getEvents = async (queryParams) => {
  const defaultParams = {};
  const res = await axios.get("/events", { params: queryParams ?? defaultParams });
  const events = res?.data;
  return events;
};
