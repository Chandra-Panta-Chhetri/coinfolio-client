import { all, call } from "redux-saga/effects";
import userSagas from "./user/user.sagas";
import notificationSagas from "./notification/notification.sagas";
import summarySagas from "./summary/summary.sagas";

function* rootSaga() {
  yield all([call(userSagas), call(notificationSagas), call(summarySagas)]);
}

export default rootSaga;
