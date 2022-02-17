import { userReducer } from "./user";
import { notificationReducer } from "./notification";
import { preferencesReducer } from "./preferences";
import { summaryReducer } from "./summary";
import { portfolioReducer } from "./portfolio";
import { discoverReducer } from "./discover";
import { combineReducers } from "redux";
import { marketReducer } from "./market";

export default combineReducers({
  user: userReducer,
  notification: notificationReducer,
  preferences: preferencesReducer,
  summary: summaryReducer,
  portfolio: portfolioReducer,
  discover: discoverReducer,
  market: marketReducer
});
