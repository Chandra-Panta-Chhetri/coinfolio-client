import axios from "./axios-config";

export const fetchEvents = async (queryParams = {}) => {
  const events = await axios.get("/events", { params: queryParams });
  return events.data;
};
