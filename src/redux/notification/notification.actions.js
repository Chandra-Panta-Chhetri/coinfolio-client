import NOTIFICATION_ACTION_TYPES from "./notification.action.types";

export const addSuccessNotification = (message) => ({
  type: NOTIFICATION_ACTION_TYPES.ADD_SUCCESS_NOTIFICATION,
  payload: {
    message,
    backgroundColor: "#5cb85c"
  }
});

export const addErrorNotification = (message) => ({
  type: NOTIFICATION_ACTION_TYPES.ADD_ERROR_NOTIFICATION,
  payload: {
    message,
    backgroundColor: "#d9534f"
  }
});

export const addInfoNotification = (message) => ({
  type: NOTIFICATION_ACTION_TYPES.ADD_INFO_NOTIFICATION,
  payload: {
    message,
    backgroundColor: "#5bc0de"
  }
});

export const addWarningNotification = (message) => ({
  type: NOTIFICATION_ACTION_TYPES.ADD_WARNING_NOTIFICATION,
  payload: {
    message,
    backgroundColor: "#f0ad4e"
  }
});
