import USER_ACTION_TYPES from "./user.action.types";

const INITIAL_STATE = {
  currentUser: null,
  isChangingAuthState: false,
  token: null
};

const userReducer = (prevState = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_ACTION_TYPES.EMAIL_LOGIN:
    case USER_ACTION_TYPES.REGISTER:
    case USER_ACTION_TYPES.LOG_OUT:
    case USER_ACTION_TYPES.AUTO_LOGIN:
      return {
        ...prevState,
        isChangingAuthState: true
      };
    case USER_ACTION_TYPES.LOGIN_SUCCESS:
    case USER_ACTION_TYPES.REGISTER_SUCCESS:
      return {
        ...prevState,
        currentUser: action.payload.user,
        token: action.payload.token,
        isChangingAuthState: false
      };
    case USER_ACTION_TYPES.LOGIN_FAIL:
    case USER_ACTION_TYPES.REGISTER_FAIL:
    case USER_ACTION_TYPES.LOG_OUT_SUCCESS:
      return {
        ...prevState,
        currentUser: null,
        isChangingAuthState: false,
        token: null
      };
    case USER_ACTION_TYPES.LOG_OUT_FAIL:
      return {
        ...prevState,
        isChangingAuthState: false
      };
    default:
      return prevState;
  }
};

export default userReducer;
