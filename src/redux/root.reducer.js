import userReducer from "./user/user.reducer";
import notificationReducer from "./notification/notification.reducer";
import { combineReducers } from "redux";

export default combineReducers({
  user: userReducer,
  notification: notificationReducer
});
