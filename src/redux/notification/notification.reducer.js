import NOTIFICATION_ACTION_TYPES from "./notification.action.types";

const INITIAL_STATE = {
  notification: null
};

const notificationReducer = (prevState = INITIAL_STATE, action) => {
  switch (action.type) {
    case NOTIFICATION_ACTION_TYPES.SUCCESS_NOTIFICATION:
    case NOTIFICATION_ACTION_TYPES.ERROR_NOTIFICATION:
    case NOTIFICATION_ACTION_TYPES.INFO_NOTIFICATION:
    case NOTIFICATION_ACTION_TYPES.WARNING_NOTIFICATION:
      return {
        ...prevState,
        notification: action.payload
      };
    case NOTIFICATION_ACTION_TYPES.CLEAR_NOTIFICATION:
      return {
        ...prevState,
        notification: null
      };
    default:
      return prevState;
  }
};

export default notificationReducer;
