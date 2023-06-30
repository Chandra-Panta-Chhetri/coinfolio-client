import axios from "./axios-config";

export const getEvents = async (queryParams) => {
  const defaultParams = {};
  console.log(queryParams, "GET EVENTS");
  const res = await axios.get("/events", { params: queryParams ?? defaultParams });
  const events = res?.data;
  return events;
};
