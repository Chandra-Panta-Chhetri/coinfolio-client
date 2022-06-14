import USER_ACTION_TYPES from "./user.action.types";

export const startAutoLogin = () => ({
  type: USER_ACTION_TYPES.AUTO_LOGIN
});

export const startEmailLogin = (credentials) => ({
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

export const startUserRegister = (newUser) => ({
  type: USER_ACTION_TYPES.REGISTER,
  payload: newUser
});

export const userRegisterFail = (errorMsg) => ({
  type: USER_ACTION_TYPES.REGISTER_FAIL,
  payload: errorMsg
});

export const userRegisterSuccess = (user, token) => ({
  type: USER_ACTION_TYPES.REGISTER_SUCCESS,
  payload: { user, token }
});

export const startLogOut = () => ({
  type: USER_ACTION_TYPES.LOG_OUT
});

export const logOutSuccess = () => ({
  type: USER_ACTION_TYPES.LOG_OUT_SUCCESS
});

export const logOutFail = (errorMsg) => ({
  type: USER_ACTION_TYPES.LOG_OUT_FAIL,
  payload: errorMsg
});
