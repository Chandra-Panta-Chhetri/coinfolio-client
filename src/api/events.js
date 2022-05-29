import axios from "./axios-config";

export const getEvents = async (queryParams = {}) => {
  const events = await axios.get("/events", { params: queryParams });
  return events.data;
};
