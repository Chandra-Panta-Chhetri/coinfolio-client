import { takeLatest, put, call, all, select } from "redux-saga/effects";
import {
  loginSuccess,
  loginFail,
  userRegisterFail,
  logOutSuccess,
  logOutFail,
  userRegisterSuccess
} from "./user.actions";
import USER_ACTION_TYPES from "./user.action.types";
import { authAPI } from "../../api";
import * as SecureStore from "expo-secure-store";
import { addSuccessNotification } from "../notification";

function* loginWithEmail({ payload: credentials }) {
  try {
    const { user, token } = yield authAPI.login(credentials);
    yield SecureStore.setItemAsync("token", token);
    yield put(addSuccessNotification("Logged in successfully!"));
    yield put(loginSuccess(user, token));
  } catch (err) {
    yield put(loginFail(err?.response?.data?.message));
  }
}

function* logOutUser() {
  try {
    yield SecureStore.deleteItemAsync("token");
    yield put(addSuccessNotification("Logged out successfully!"));
    yield put(logOutSuccess());
  } catch (err) {
    yield put(logOutFail("Logout failed, please try again"));
  }
}

function* registerNewUser({ payload: newUser }) {
  try {
    const { user, token } = yield authAPI.registerUser(newUser);
    yield SecureStore.setItemAsync("token", token);
    yield put(userRegisterSuccess(user, token));
  } catch (err) {
    yield put(userRegisterFail(err.response.data.message));
  }
}

function* watchEmailLogin() {
  yield takeLatest(USER_ACTION_TYPES.EMAIL_LOGIN, loginWithEmail);
}

function* watchRegister() {
  yield takeLatest(USER_ACTION_TYPES.REGISTER, registerNewUser);
}

function* watchLogOut() {
  yield takeLatest(USER_ACTION_TYPES.LOG_OUT, logOutUser);
}

export default function* userSagas() {
  yield all([call(watchRegister), call(watchEmailLogin), call(watchLogOut)]);
}
