import userReducer from "./user/user.reducer";
import notificationReducer from "./notification/notification.reducer";
import preferencesReducer from "./preferences/preferences.reducer";
import summaryReducer from "./summary/summary.reducer";
import { combineReducers } from "redux";

export default combineReducers({
  user: userReducer,
  notification: notificationReducer,
  preferences: preferencesReducer,
  summary: summaryReducer
});
