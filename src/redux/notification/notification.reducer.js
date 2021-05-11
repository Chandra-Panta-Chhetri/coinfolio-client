import NOTIFICATION_ACTION_TYPES from "./notification.action.types";

const INITIAL_STATE = {
  notifications: []
};

const notificationReducer = (prevState = INITIAL_STATE, action) => {
  switch (action.type) {
    case NOTIFICATION_ACTION_TYPES.ADD_SUCCESS_NOTIFICATION:
    case NOTIFICATION_ACTION_TYPES.ADD_ERROR_NOTIFICATION:
    case NOTIFICATION_ACTION_TYPES.ADD_INFO_NOTIFICATION:
    case NOTIFICATION_ACTION_TYPES.ADD_WARNING_NOTIFICATION:
      return {
        ...prevState,
        notifications: [action.payload]
      };
    default:
      return prevState;
  }
};

export default notificationReducer;
