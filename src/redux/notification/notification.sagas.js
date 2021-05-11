import USER_ACTION_TYPES from "../user/user.action.types";
import { all, call, put, takeEvery } from "redux-saga/effects";
import {
  addErrorNotification,
  addSuccessNotification
} from "./notification.actions";

function* showErrorNotification({ payload: { errorMsg } }) {
  yield put(addErrorNotification(errorMsg));
}

function* showSuccessNotification({ payload: { successMsg } }) {
  yield put(addSuccessNotification(successMsg));
}

function* watchErrorNotifications() {
  yield takeEvery(
    [
      USER_ACTION_TYPES.SIGN_UP_FAIL,
      USER_ACTION_TYPES.LOG_OUT_FAIL,
      USER_ACTION_TYPES.SIGN_IN_FAIL
    ],
    showErrorNotification
  );
}

function* watchSuccessNotifications() {
  yield takeEvery([], showSuccessNotification);
}

export default function* notificationSagas() {
  yield all([call(watchErrorNotifications), call(watchSuccessNotifications)]);
}
