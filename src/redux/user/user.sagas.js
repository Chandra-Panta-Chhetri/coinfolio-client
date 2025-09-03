import { takeLatest, put, call, all } from "redux-saga/effects";
import { loginSuccess, loginFail, registerFail, logoutSuccess, logoutFail, registerSuccess } from "./user.actions";
import USER_ACTION_TYPES from "./user.action.types";
import { authAPI } from "../../api";
import * as SecureStore from "expo-secure-store";
import { addSuccessNotification } from "../notification";
import { isNullOrUndefined } from "../../utils";
import { USER_CONFIG } from "./constants";

function* loginWithEmail({ payload: credentials }) {
  try {
    const { user, token } = yield authAPI.login(credentials);
    if (!isNullOrUndefined(user) && !isNullOrUndefined(token)) {
      yield SecureStore.setItemAsync(USER_CONFIG.SECURE_STORE_TOKEN_KEY_NAME, token);
      yield put(addSuccessNotification("Logged in!"));
      yield put(loginSuccess(user, token));
    } else {
      throw new Error("Login failed");
    }
  } catch (err) {
    yield put(loginFail(err?.response?.data?.message ?? "Login failed. Please try again later"));
  }
}

function* logoutUser() {
  try {
    yield SecureStore.deleteItemAsync(USER_CONFIG.SECURE_STORE_TOKEN_KEY_NAME);
    yield put(addSuccessNotification("Logged out!"));
    yield put(logoutSuccess());
  } catch (err) {
    yield put(logoutFail("Logout failed. Please try again later"));
  }
}

function* registerUser({ payload: newUser }) {
  try {
    const { user, token } = yield authAPI.registerUser(newUser);
    if (!isNullOrUndefined(user) && !isNullOrUndefined(token)) {
      yield SecureStore.setItemAsync(USER_CONFIG.SECURE_STORE_TOKEN_KEY_NAME, token);
      yield put(registerSuccess(user, token));
    } else {
      throw new Error("Register failed");
    }
  } catch (err) {
    yield put(registerFail(err?.response?.data?.message ?? "Register failed. Please try again later"));
  }
}

function* watchEmailLogin() {
  yield takeLatest(USER_ACTION_TYPES.EMAIL_LOGIN, loginWithEmail);
}

function* watchRegisterUser() {
  yield takeLatest(USER_ACTION_TYPES.REGISTER, registerUser);
}

function* watchLogout() {
  yield takeLatest(USER_ACTION_TYPES.LOG_OUT, logoutUser);
}

export default function* userSagas() {
  yield all([call(watchRegisterUser), call(watchEmailLogin), call(watchLogout)]);
}
