import NOTIFICATION_ACTION_TYPES from "./notification.action.types";
import { COLORS } from "../../constants";

export const addSuccessNotification = (message) => ({
  type: NOTIFICATION_ACTION_TYPES.ADD_SUCCESS_NOTIFICATION,
  payload: {
    message,
    backgroundColor: COLORS.SUCCESS
  }
});

export const addErrorNotification = (message) => ({
  type: NOTIFICATION_ACTION_TYPES.ADD_ERROR_NOTIFICATION,
  payload: {
    message,
    backgroundColor: COLORS.ERROR
  }
});

export const addInfoNotification = (message) => ({
  type: NOTIFICATION_ACTION_TYPES.ADD_INFO_NOTIFICATION,
  payload: {
    message,
    backgroundColor: COLORS.INFO
  }
});

export const addWarningNotification = (message) => ({
  type: NOTIFICATION_ACTION_TYPES.ADD_WARNING_NOTIFICATION,
  payload: {
    message,
    backgroundColor: COLORS.WARNING
  }
});

export const clearNotifications = () => ({
  type: NOTIFICATION_ACTION_TYPES.CLEAR_NOTIFICATIONS
});
