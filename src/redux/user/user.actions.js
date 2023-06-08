import USER_ACTION_TYPES from "./user.action.types";

export const loginWithEmail = (credentials) => ({
  type: USER_ACTION_TYPES.EMAIL_LOGIN,
  payload: credentials
});

export const loginSuccess = (user, token) => ({
  type: USER_ACTION_TYPES.LOGIN_SUCCESS,
  payload: { user, token }
});

export const loginFail = (errorMsg) => ({
  type: USER_ACTION_TYPES.LOGIN_FAIL,
  payload: errorMsg
});

export const registerUser = (newUser) => ({
  type: USER_ACTION_TYPES.REGISTER,
  payload: newUser
});

export const registerFail = (errorMsg) => ({
  type: USER_ACTION_TYPES.REGISTER_FAIL,
  payload: errorMsg
});

export const registerSuccess = (user, token) => ({
  type: USER_ACTION_TYPES.REGISTER_SUCCESS,
  payload: { user, token }
});

export const logout = () => ({
  type: USER_ACTION_TYPES.LOG_OUT
});

export const logoutSuccess = () => ({
  type: USER_ACTION_TYPES.LOG_OUT_SUCCESS
});

export const logoutFail = (errorMsg) => ({
  type: USER_ACTION_TYPES.LOG_OUT_FAIL,
  payload: errorMsg
});
