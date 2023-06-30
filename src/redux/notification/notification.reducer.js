import NOTIFICATION_ACTION_TYPES from "./notification.action.types";

const INITIAL_STATE = {
  notifications: []
};

const notificationReducer = (prevState = INITIAL_STATE, action) => {
  switch (action?.type) {
    case NOTIFICATION_ACTION_TYPES.ADD_SUCCESS_NOTIFICATION:
    case NOTIFICATION_ACTION_TYPES.ADD_ERROR_NOTIFICATION:
    case NOTIFICATION_ACTION_TYPES.ADD_INFO_NOTIFICATION:
    case NOTIFICATION_ACTION_TYPES.ADD_WARNING_NOTIFICATION:
      return {
        ...prevState,
        notifications: [...prevState.notifications, action?.payload]
      };
    case NOTIFICATION_ACTION_TYPES.CLEAR_RECENT_NOTIFICATION:
      return {
        ...prevState,
        notifications: [...prevState.notifications.slice(1)]
      };
    default:
      return prevState;
  }
};

export default notificationReducer;
