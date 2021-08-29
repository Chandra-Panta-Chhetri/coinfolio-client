import CONSTANTS from "../../Constants";
import NOTIFICATION_ACTION_TYPES from "./notification.action.types";

export const addSuccessNotification = (message) => ({
  type: NOTIFICATION_ACTION_TYPES.ADD_SUCCESS_NOTIFICATION,
  payload: {
    message,
    backgroundColor: CONSTANTS.SNACKBAR.SUCCESS
  }
});

export const addErrorNotification = (message) => ({
  type: NOTIFICATION_ACTION_TYPES.ADD_ERROR_NOTIFICATION,
  payload: {
    message,
    backgroundColor: CONSTANTS.SNACKBAR.ERROR
  }
});

export const addInfoNotification = (message) => ({
  type: NOTIFICATION_ACTION_TYPES.ADD_INFO_NOTIFICATION,
  payload: {
    message,
    backgroundColor: CONSTANTS.SNACKBAR.INFO
  }
});

export const addWarningNotification = (message) => ({
  type: NOTIFICATION_ACTION_TYPES.ADD_WARNING_NOTIFICATION,
  payload: {
    message,
    backgroundColor: CONSTANTS.SNACKBAR.WARNING
  }
});

export const clearNotifications = () => ({
  type: NOTIFICATION_ACTION_TYPES.CLEAR_NOTIFICATIONS
});
