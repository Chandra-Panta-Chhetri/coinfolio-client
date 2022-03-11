import { createSelector } from "reselect";

const selectNotificationStore = (state) => state.notification;

export const selectRecentNotification = createSelector(
  [selectNotificationStore],
  (notification) => notification.notification
);
