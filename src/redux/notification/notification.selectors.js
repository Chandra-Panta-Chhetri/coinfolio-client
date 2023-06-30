import { createSelector } from "reselect";

const selectNotificationStore = (state) => state?.notification;

export const selectNotifications = createSelector(
  [selectNotificationStore],
  (notification) => notification?.notifications
);
