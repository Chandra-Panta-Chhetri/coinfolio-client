import USER_ACTION_TYPES from "./user.action.types";
import { takeLatest, put, call, all, select } from "redux-saga/effects";
import {
  signInSuccess,
  signInFail,
  signUpFail,
  logOutSuccess,
  logOutFail,
  startEmailSignIn
} from "./user.actions";
import { addSuccessNotification } from "../notification/notification.actions";
import { selectHasAutoSignedIn } from "./user.selectors";
import AsyncStorage from "@react-native-async-storage/async-storage";

function* setUserFromAuth(user) {
  yield put(signInSuccess(user));
  yield AsyncStorage.setItem("user", JSON.stringify(user));
}

function* signInWithEmail({ payload: { email, password } }) {
  try {
  } catch (err) {
    yield put(signInFail("Email or password incorrect"));
  }
}

function* autoSignIn() {
  try {
    const user = yield AsyncStorage.getItem("user");
    if (!user) {
      throw Error();
    }
    yield call(setUserFromAuth, user);
  } catch (err) {
    yield put(signInFail("Please login again for security purposes"));
  }
}

function* signOutUser() {
  try {
    yield AsyncStorage.removeItem("user");
    yield put(logOutSuccess());
  } catch (err) {
    yield put(logOutFail("Signing out failed, please try again"));
  }
}

function* signUpUser({ payload: { newUserInfo } }) {
  const { email, password, fullName, confirmPassword } = yield newUserInfo;
  try {
    if (password !== confirmPassword) throw Error("Passwords must match");
    yield put(startEmailSignIn({ email, password }));
  } catch (err) {
    yield put(
      signUpFail(err.message || "Sign up error. Please try again later.")
    );
  }
}

function* handleSignInSuccess({ payload: loggedInUser }) {
  const hasAutoLoggedIn = yield select(selectHasAutoSignedIn);
  if (!hasAutoLoggedIn) {
    yield put(addSuccessNotification(`Welcome back ${loggedInUser.fullName}!`));
    yield AsyncStorage.setItem("hasAutoSignedIn", JSON.stringify(true));
  }
  yield AsyncStorage.setItem("user", JSON.stringify(loggedInUser));
}

function* handleLogOutSuccess() {
  yield AsyncStorage.removeItem("user");
  yield AsyncStorage.setItem("hasAutoSignedIn", JSON.stringify(false));
  yield put(addSuccessNotification("Logged out successfully"));
}

function* watchEmailSignIn() {
  yield takeLatest(USER_ACTION_TYPES.START_EMAIL_SIGN_IN, signInWithEmail);
}

function* watchGetUserFromSession() {
  yield takeLatest(USER_ACTION_TYPES.START_AUTO_SIGN_IN, autoSignIn);
}

function* watchSignUpStart() {
  yield takeLatest(USER_ACTION_TYPES.START_SIGN_UP, signUpUser);
}

function* watchSignInSuccess() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_IN_SUCCESS, handleSignInSuccess);
}

function* watchStartLogOut() {
  yield takeLatest(USER_ACTION_TYPES.START_LOG_OUT, signOutUser);
}

function* watchLogOutSuccess() {
  yield takeLatest(USER_ACTION_TYPES.LOG_OUT_SUCCESS, handleLogOutSuccess);
}

export default function* userSagas() {
  yield all([
    call(watchSignUpStart),
    call(watchEmailSignIn),
    call(watchGetUserFromSession),
    call(watchSignInSuccess),
    call(watchStartLogOut),
    call(watchLogOutSuccess)
  ]);
}
