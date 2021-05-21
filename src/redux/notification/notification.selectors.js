import { createSelector } from "reselect";

const selectNotification = (state) => state.notification;

export const selectNotifications = createSelector(
  [selectNotification],
  (notification) => notification.notifications
);

export const selectRecentNotification = createSelector(
  [selectNotifications],
  (notifications) => (notifications.length > 0 ? notifications[0] : null)
);
